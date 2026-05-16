#!/usr/bin/env bash
# Installs developer tools required to work in this monorepo.
# Run once after cloning: task setup
set -euo pipefail

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

install_precommit

echo ""
echo "Wiring up git hooks..."
pre-commit install
echo ""
echo "Setup complete. Git hooks are active."
