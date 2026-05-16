#!/usr/bin/env bash
set -euo pipefail
STAGED=$(git diff --cached --name-only)
for dir in apps/*/; do
  [ -d "$dir" ] || continue
  app="${dir%/}"
  if echo "$STAGED" | grep -qE "^${app}/.*\.(ts|tsx)$"; then
    echo "→ eslint: $app"
    (cd "$app" && bun run lint 2>&1)
  fi
done
