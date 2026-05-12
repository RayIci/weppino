plugins {
    // java-library exposes api vs implementation separation - consumers see only api dependencies
    `java-library`
    // maven-publish adds the publish task required to upload
    `maven-publish`
}

// Maven coordinates: group:artifactId:version - artifactId is inferred from rootProject.name
group = "com.weppino"
version = "0.1.0"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(libs.junit.jupiter)
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

java {
    // Pin the Java version independently of the JDK running Gradle
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            from(components["java"])
        }
    }

    repositories {
        maven {
            name = "GitHubPackages"
            url = uri("https://maven.pkg.github.com/RayIci/weppino")
            // Credentials are injected by GitHub Actions
            credentials {
                username = System.getenv("GITHUB_ACTOR")
                password = System.getenv("GITHUB_TOKEN")
            }
        }
    }
}
