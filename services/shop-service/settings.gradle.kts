pluginManagement {
    includeBuild("../../build-logic")
    repositories {
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    // Apply the foojay-resolver plugin to allow automatic download of JDKs
    id("org.gradle.toolchains.foojay-resolver-convention") version "1.0.0"
}

rootProject.name = "shop-service"
include("domain", "application", "infrastructure", "api", "bootstrap")

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    repositories {
        mavenCentral()
        maven {
            name = "GitHubPackages"
            url = uri("https://maven.pkg.github.com/RayIci/weppino")
            credentials {
                // Reads from ~/.gradle/gradle.properties (local dev)
                // or from environment variables (CI — GitHub Actions injects these automatically)
                username =
                    providers
                        .gradleProperty("GITHUB_ACTOR")
                        .orElse(providers.environmentVariable("GITHUB_ACTOR"))
                        .orElse("")
                        .get()
                password =
                    providers
                        .gradleProperty("GITHUB_TOKEN")
                        .orElse(providers.environmentVariable("GITHUB_TOKEN"))
                        .orElse("")
                        .get()
            }
        }
    }
}
