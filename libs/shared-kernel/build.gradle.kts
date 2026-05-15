plugins {
    // java-conventions brings: java-library, Java 25 toolchain, Spotless, Checkstyle, JUnit 5
    id("java-conventions")
    // maven-publish adds the publish task required to upload
    `maven-publish`
}

// Maven coordinates: group:artifactId:version - artifactId is inferred from rootProject.name
group = "com.weppino"
version = "0.1.0"

dependencies {
    testImplementation(libs.junit.jupiter)
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
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
