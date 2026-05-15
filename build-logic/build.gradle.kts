plugins {
    `kotlin-dsl`
}

repositories {
    mavenCentral()
    gradlePluginPortal()
}

dependencies {
    // Spotless applies code formatters (Google Java Format, ktlint) as Gradle tasks
    implementation("com.diffplug.spotless:spotless-plugin-gradle:7.0.4")
}
