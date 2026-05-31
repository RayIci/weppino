// Registers Spotless and Error Prone at the root project level so all subprojects
// share the same plugin classloader, avoiding build service conflicts in multi-project builds.
plugins {
    alias(libs.plugins.spotless) apply false
    alias(libs.plugins.errorprone.plugin) apply false
}
