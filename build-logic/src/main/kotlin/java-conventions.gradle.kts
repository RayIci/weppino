plugins {
    `java-library`
    id("com.diffplug.spotless")
    checkstyle
}

repositories {
    mavenCentral()
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

spotless {
    java {
        // Enforces Google Java Format — opinionated, zero config, auto-fixes on spotlessApply
        googleJavaFormat("1.27.0")
        removeUnusedImports()
    }
    kotlinGradle {
        // Formats .gradle.kts build files
        ktlint("1.5.0")
    }
}

checkstyle {
    toolVersion = "10.26.1"
    // Config lives at <repo-root>/config/checkstyle/ — shared by all Java projects
    val buildLogicDir = gradle.includedBuilds
        .firstOrNull { it.name == "build-logic" }
        ?.projectDir
        ?: rootDir.parentFile.parentFile.resolve("build-logic")
    configFile = buildLogicDir.resolve("src/main/resources/checkstyle/google_checks.xml")
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}
