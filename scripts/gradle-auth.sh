#!/usr/bin/env bash
# Configures ~/.gradle/gradle.properties with GitHub Packages credentials
# so Gradle can download packages from github.com/RayIci/weppino.
# Run: task gradle:auth
set -euo pipefail

GRADLE_DIR="$HOME/.gradle"
GRADLE_PROPS="$GRADLE_DIR/gradle.properties"

# Verify the gh CLI token has the read:packages scope required by GitHub Packages.
check_packages_scope() {
  if ! command -v gh &>/dev/null || ! gh auth status &>/dev/null 2>&1; then
    return 1
  fi
  gh auth status --show-token 2>&1 | grep -q "read:packages\|write:packages\|delete:packages"
}

# Try to get the GitHub username from an authenticated gh CLI session.
detect_actor() {
  if command -v gh &>/dev/null && gh auth status &>/dev/null 2>&1; then
    gh api user --jq '.login' 2>/dev/null || true
  fi
}

# Try to get the GitHub token from an authenticated gh CLI session.
detect_token() {
  if command -v gh &>/dev/null && gh auth status &>/dev/null 2>&1; then
    gh auth token 2>/dev/null || true
  fi
}

# Read a key's current value from a Java properties file.
get_prop() {
  local file="$1" key="$2"
  grep -E "^[[:space:]]*${key}[[:space:]]*=" "$file" 2>/dev/null \
    | head -1 \
    | sed 's/^[^=]*=//' \
    | sed 's/^[[:space:]]*//' \
    | sed 's/[[:space:]]*$//' \
    || true
}

# Add a key if absent, or replace it if already present.
set_prop() {
  local file="$1" key="$2" value="$3"
  if grep -qE "^[[:space:]]*${key}[[:space:]]*=" "$file" 2>/dev/null; then
    sed -i "s|^[[:space:]]*${key}[[:space:]]*=.*|${key}=${value}|" "$file"
  else
    # Ensure the file ends with a newline before appending.
    [[ -s "$file" ]] && [[ "$(tail -c1 "$file" | wc -l)" -eq 0 ]] && echo "" >> "$file"
    echo "${key}=${value}" >> "$file"
  fi
}

echo "Configuring GitHub Packages credentials in $GRADLE_PROPS"
echo ""

# --- GITHUB_ACTOR ---
actor=$(detect_actor)
if [[ -n "$actor" ]]; then
  echo "Detected GitHub username via gh CLI: $actor"
else
  read -rp "Enter your GitHub username (GITHUB_ACTOR): " actor
fi
[[ -z "$actor" ]] && { echo "Error: GitHub username cannot be empty."; exit 1; }

# --- GITHUB_TOKEN ---
token=$(detect_token)
if [[ -n "$token" ]]; then
  if check_packages_scope; then
    echo "Detected GitHub token via gh CLI (read:packages scope confirmed)."
  else
    echo ""
    echo "WARNING: your gh CLI token does not have the 'read:packages' scope."
    echo "GitHub Packages requires this scope even for public packages."
    echo "Re-authenticate with: gh auth login --scopes read:packages"
    echo ""
    read -rp "Re-authenticate now? [Y/n] " yn
    if [[ "${yn,,}" != "n" ]]; then
      gh auth login --scopes read:packages
      token=$(detect_token)
    else
      echo "Continuing with current token — downloads from GitHub Packages will fail."
    fi
  fi
else
  echo ""
  echo "No authenticated gh CLI session found."
  echo "Create a personal access token at: https://github.com/settings/tokens"
  echo "Required scope: read:packages"
  echo ""
  read -rsp "Enter your GitHub token (GITHUB_TOKEN, input hidden): " token
  echo ""
fi
[[ -z "$token" ]] && { echo "Error: GitHub token cannot be empty."; exit 1; }

# --- Ensure ~/.gradle exists ---
mkdir -p "$GRADLE_DIR"

# --- Create file from scratch if it does not exist ---
if [[ ! -f "$GRADLE_PROPS" ]]; then
  echo ""
  echo "Creating $GRADLE_PROPS..."
  printf 'GITHUB_ACTOR=%s\nGITHUB_TOKEN=%s\n' "$actor" "$token" > "$GRADLE_PROPS"
  echo "Done."
  exit 0
fi

# --- Merge into existing file ---
echo ""
echo "$GRADLE_PROPS already exists — merging..."

existing_actor=$(get_prop "$GRADLE_PROPS" "GITHUB_ACTOR")
existing_token=$(get_prop "$GRADLE_PROPS" "GITHUB_TOKEN")

# GITHUB_ACTOR
if [[ -z "$existing_actor" ]]; then
  set_prop "$GRADLE_PROPS" "GITHUB_ACTOR" "$actor"
  echo "  Added GITHUB_ACTOR."
elif [[ "$existing_actor" == "$actor" ]]; then
  echo "  GITHUB_ACTOR already correct — skipping."
else
  read -rp "  GITHUB_ACTOR is currently '$existing_actor', detected '$actor'. Update? [y/N] " yn
  if [[ "${yn,,}" == "y" ]]; then
    set_prop "$GRADLE_PROPS" "GITHUB_ACTOR" "$actor"
    echo "  Updated GITHUB_ACTOR."
  else
    echo "  Kept existing GITHUB_ACTOR."
  fi
fi

# GITHUB_TOKEN
if [[ -z "$existing_token" ]]; then
  set_prop "$GRADLE_PROPS" "GITHUB_TOKEN" "$token"
  echo "  Added GITHUB_TOKEN."
elif [[ "$existing_token" == "$token" ]]; then
  echo "  GITHUB_TOKEN already correct — skipping."
else
  read -rp "  GITHUB_TOKEN differs from the detected token. Update? [y/N] " yn
  if [[ "${yn,,}" == "y" ]]; then
    set_prop "$GRADLE_PROPS" "GITHUB_TOKEN" "$token"
    echo "  Updated GITHUB_TOKEN."
  else
    echo "  Kept existing GITHUB_TOKEN."
  fi
fi

echo ""
echo "Done. Gradle can now authenticate with GitHub Packages."
