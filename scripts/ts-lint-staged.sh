#!/usr/bin/env bash
set -euo pipefail

STAGED=$(git diff --cached --name-only)
failed=0

for dir in apps/*/; do
  [ -d "$dir" ] || continue
  app="${dir%/}"

  staged_files=$(echo "$STAGED" | grep -E "^${app}/.*\.(ts|tsx)$" || true)
  [ -z "$staged_files" ] && continue

  echo "→ lint: $app"
  if ! (cd "$app" && bun run lint 2>&1); then
    echo "✗ $app: lint violations"
    failed=1
  fi
done

exit $failed
