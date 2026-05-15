#!/usr/bin/env bash
# Installs developer tools required to work in this monorepo.
# Run once after cloning: task setup
set -euo pipefail

LEFTHOOK_VERSION="2.1.6"
BIN_DIR="$HOME/.local/bin"
mkdir -p "$BIN_DIR"

install_lefthook() {
  if command -v lefthook &>/dev/null; then
    echo "lefthook $(lefthook --version) already installed — skipping"
    return
  fi

  OS=$(uname -s | tr '[:upper:]' '[:lower:]')
  ARCH=$(uname -m)

  case "$ARCH" in
    x86_64)  ARCH="x86_64" ;;
    aarch64|arm64) ARCH="arm64" ;;
    *) echo "Unsupported architecture: $ARCH" && exit 1 ;;
  esac

  case "$OS" in
    linux)  FILENAME="lefthook_${LEFTHOOK_VERSION}_Linux_${ARCH}" ;;
    darwin) FILENAME="lefthook_${LEFTHOOK_VERSION}_MacOS_${ARCH}" ;;
    *) echo "Unsupported OS: $OS" && exit 1 ;;
  esac

  URL="https://github.com/evilmartians/lefthook/releases/download/v${LEFTHOOK_VERSION}/${FILENAME}"
  echo "Installing lefthook v${LEFTHOOK_VERSION}..."
  curl -fsSL "$URL" -o "$BIN_DIR/lefthook"
  chmod +x "$BIN_DIR/lefthook"
  echo "lefthook installed at $BIN_DIR/lefthook"

  if [[ ":$PATH:" != *":$BIN_DIR:"* ]]; then
    echo ""
    echo "NOTE: $BIN_DIR is not in your PATH."
    echo "Add this to your shell profile (~/.zshrc or ~/.bashrc) and restart your shell:"
    echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
  fi
}

install_lefthook

echo ""
echo "Wiring up git hooks..."
lefthook install
echo ""
echo "Setup complete. Git hooks are active."
