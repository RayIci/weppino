#!/usr/bin/env bash
set -euo pipefail
GJF_JAR="$HOME/.local/share/google-java-format/google-java-format-1.27.0-all-deps.jar"
exec java \
  --add-exports=jdk.compiler/com.sun.tools.javac.api=ALL-UNNAMED \
  --add-exports=jdk.compiler/com.sun.tools.javac.file=ALL-UNNAMED \
  --add-exports=jdk.compiler/com.sun.tools.javac.parser=ALL-UNNAMED \
  --add-exports=jdk.compiler/com.sun.tools.javac.tree=ALL-UNNAMED \
  --add-exports=jdk.compiler/com.sun.tools.javac.util=ALL-UNNAMED \
  -jar "$GJF_JAR" --replace "$@"
