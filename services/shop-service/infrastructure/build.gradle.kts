plugins {
    id("java-conventions")
}

dependencies {
    implementation(project(":domain"))
    implementation(project(":application"))

    implementation(enforcedPlatform(libs.quarkus.bom))
    implementation("io.quarkus:quarkus-hibernate-orm-panache")
    implementation("io.quarkus:quarkus-jdbc-postgresql")
    implementation("io.quarkus:quarkus-scheduler")
}
