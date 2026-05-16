#!/usr/bin/env bash
set -euo pipefail

STAGED=$(git diff --cached --name-only)
failed=0

for dir in apps/*/; do
  [ -d "$dir" ] || continue
  app="${dir%/}"

  staged_files=$(echo "$STAGED" | grep -E "^${app}/.*\.(ts|tsx|json|yaml|css|md)$" | sed "s|^${app}/||" || true)
  [ -z "$staged_files" ] && continue

  echo "→ format: $app"
  if ! (cd "$app" && echo "$staged_files" | xargs bunx prettier --write 2>&1); then
    echo "✗ $app: formatting violations"
    failed=1
  fi
done

exit $failed
