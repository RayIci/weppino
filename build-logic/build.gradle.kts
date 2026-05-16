plugins {
    `kotlin-dsl`
}

repositories {
    mavenCentral()
    gradlePluginPortal()
}

dependencies {
    // Spotless applies code formatters (Google Java Format, ktlint) as Gradle tasks
    implementation("com.diffplug.spotless:spotless-plugin-gradle:8.5.1")

    // The Error Prone Gradle plugin wires Google's static analyser into every
    // JavaCompile task via the plugin ID 'net.ltgt.errorprone' used in
    // java-conventions.gradle.kts. It must be declared here in build-logic —
    // not in the library's own build.gradle.kts — because convention plugins
    // need their plugin dependencies on the build-logic classpath to be able
    // to apply them. Check https://github.com/tbroyer/gradle-errorprone-plugin/releases
    // for the latest version.
    implementation("net.ltgt.gradle:gradle-errorprone-plugin:4.4.0")
}
