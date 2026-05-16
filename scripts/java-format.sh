#!/usr/bin/env bash
set -euo pipefail
declare -A seen
for f in "$@"; do
  for dir in libs/*/  services/*/; do
    [ -d "$dir" ] || continue
    project="${dir%/}"
    if [[ "$f" == "$project/"* ]] && [ -z "${seen[$project]+_}" ]; then
      seen[$project]=1
      echo "→ format: $project"
      (cd "$project" && ./gradlew spotlessApply --quiet 2>&1)
    fi
  done
done
