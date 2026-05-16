plugins {
    `java-library`
    id("com.diffplug.spotless")
    checkstyle

    // Error Prone runs Google's static analyser as a javac compiler plugin.
    // It catches common bugs — null dereferences, thread-safety violations, API
    // misuse — at compile time, before any test can run. Applying this plugin
    // automatically enables Error Prone on every JavaCompile task; no separate
    // Gradle task is needed. The plugin dependency is declared in build-logic's
    // build.gradle.kts so it is on the classpath when this convention plugin compiles.
    id("net.ltgt.errorprone")

    // JaCoCo (Java Code Coverage) instruments the compiled bytecode to record
    // which lines, branches, and methods are exercised when tests run. The
    // instrumentation is transparent: tests run normally and JaCoCo writes a
    // binary .exec file that the jacocoTestReport task converts into HTML/XML.
    jacoco
}

repositories {
    mavenCentral()
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

dependencies {
    // Error Prone core is the compiler-plugin jar that javac loads alongside
    // annotation processors. It must be on the 'errorprone' configuration —
    // not 'implementation' or 'compileOnly' — so Gradle passes it to javac
    // via -processorpath rather than the compilation classpath.
    // Check https://github.com/google/error-prone/releases for the latest version.
    errorprone("com.google.errorprone:error_prone_core:2.28.0")
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
    // JUnit Platform is the launcher API for JUnit 5. Without this line, Gradle
    // would fall back to the JUnit 4 runner and silently skip all JUnit 5 tests.
    useJUnitPlatform()

    // finalizedBy schedules jacocoTestReport to run immediately after this task
    // regardless of whether the tests pass or fail. Without finalizedBy, a test
    // failure would abort the build before the coverage report is generated,
    // and CI would have no artifact to upload for failed runs.
    finalizedBy(tasks.named("jacocoTestReport"))
}

// Configure which report formats JaCoCo generates after each test run.
tasks.named<JacocoReport>("jacocoTestReport") {
    // dependsOn guarantees that the 'test' task has already run and written
    // its binary .exec coverage data before JaCoCo tries to read and process it.
    dependsOn(tasks.named("test"))

    reports {
        // XML is machine-readable: consumed by CI dashboards, SonarQube, and
        // coverage badge services such as Codecov or Coveralls.
        xml.required = true

        // HTML produces a human-readable report at
        // build/reports/jacoco/test/html/index.html — useful for local review.
        html.required = true
    }
}
