plugins {
    id("java-conventions")
}

dependencies {
    implementation(project(":domain"))
    implementation(project(":application"))

    implementation(enforcedPlatform(libs.quarkus.bom))
    implementation("io.quarkus:quarkus-rest")
    implementation("io.quarkus:quarkus-rest-jackson")
}
