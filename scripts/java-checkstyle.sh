#!/usr/bin/env bash
set -euo pipefail
STAGED=$(git diff --cached --name-only)
declare -A seen
projects=()
for dir in libs/*/  services/*/; do
  [ -d "$dir" ] || continue
  project="${dir%/}"
  if echo "$STAGED" | grep -q "^${project}/" && [ -z "${seen[$project]+_}" ]; then
    seen[$project]=1
    projects+=("$project")
  fi
done
[ ${#projects[@]} -eq 0 ] && exit 0
for project in "${projects[@]}"; do
  echo "→ checkstyle: $project"
  (cd "$project" && ./gradlew checkstyleMain checkstyleTest --quiet 2>&1)
done
