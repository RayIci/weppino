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
        removeUnusedImports()
        googleJavaFormat("1.27.0")
    }
    kotlinGradle {
        // Formats .gradle.kts build files
        ktlint("1.5.0")
    }
}

checkstyle {
    toolVersion = "10.26.1"
    // google_checks.xml defaults severity to "warning" — treat warnings as errors
    maxWarnings = 0
    val buildLogicDir =
        gradle.includedBuilds
            .firstOrNull { it.name == "build-logic" }
            ?.projectDir
            ?: rootDir.parentFile.parentFile.resolve("build-logic")
    configFile = buildLogicDir.resolve("src/main/resources/checkstyle/google_checks.xml")
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}
