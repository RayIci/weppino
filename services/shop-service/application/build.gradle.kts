plugins {
    id("java-conventions")
}

dependencies {
    implementation(project(":domain"))
    compileOnly(libs.jakarta.cdi.api)
}
