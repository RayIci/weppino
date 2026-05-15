#!/usr/bin/env bash
set -euo pipefail

STAGED=$(git diff --cached --name-only)
pids=()
declare -A seen

for dir in libs/*/  services/*/; do
  [ -d "$dir" ] || continue
  project="${dir%/}"
  if echo "$STAGED" | grep -q "^${project}/" && [ -z "${seen[$project]+_}" ]; then
    seen[$project]=1
    echo "→ spotless: $project"
    (cd "$project" && ./gradlew spotlessApply --quiet) &
    pids+=($!)
  fi
done

# Wait for all parallel builds — fail if any failed
failed=0
for pid in "${pids[@]}"; do
  wait "$pid" || failed=1
done
exit $failed
