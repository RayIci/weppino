#!/usr/bin/env bash
# Installs developer tools required to work in this monorepo.
# Run once after cloning: task setup
set -euo pipefail

GJF_VERSION="1.27.0"
GJF_JAR_DIR="$HOME/.local/share/google-java-format"
GJF_JAR="$GJF_JAR_DIR/google-java-format-${GJF_VERSION}-all-deps.jar"

install_precommit() {
  if command -v pre-commit &>/dev/null; then
    echo "pre-commit $(pre-commit --version) already installed — skipping"
    return
  fi
  echo "Installing pre-commit..."
  pip install --user pre-commit
  echo "pre-commit installed"
  if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
    echo ""
    echo "NOTE: $HOME/.local/bin is not in your PATH."
    echo "Add this to your shell profile (~/.zshrc or ~/.bashrc) and restart your shell:"
    echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
  fi
}

install_gjf() {
  if [ -f "$GJF_JAR" ]; then
    echo "google-java-format v${GJF_VERSION} already installed — skipping"
    return
  fi
  mkdir -p "$GJF_JAR_DIR"
  local url="https://github.com/google/google-java-format/releases/download/v${GJF_VERSION}/google-java-format-${GJF_VERSION}-all-deps.jar"
  echo "Installing google-java-format v${GJF_VERSION}..."
  curl -fsSL "$url" -o "$GJF_JAR"
  echo "google-java-format installed at $GJF_JAR"
}

install_precommit
install_gjf

echo ""
echo "Wiring up git hooks..."
pre-commit install
echo ""
echo "Setup complete. Git hooks are active."
