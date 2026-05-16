#!/usr/bin/env bash
set -euo pipefail
declare -A apps
for f in "$@"; do
  app=$(echo "$f" | grep -oP '^apps/[^/]+' || true)
  [ -n "$app" ] && apps["$app"]=1
done
for app in "${!apps[@]}"; do
  rel_files=$(printf '%s\n' "$@" | grep "^${app}/" | sed "s|^${app}/||")
  echo "→ prettier: $app"
  (cd "$app" && echo "$rel_files" | xargs bunx prettier --write 2>&1)
done
