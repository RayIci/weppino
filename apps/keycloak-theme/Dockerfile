FROM node:20-alpine AS builder
RUN apk add --no-cache maven && npm install -g bun
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .

# Build the React theme + Keycloakify JAR (login + account themes)
RUN bun run build-keycloak-theme

# Inject the email theme into the JAR.
# keycloakify does not bundle email FTL files — we add them manually.
# Maven pulls in a JDK so the `jar` tool is available.
RUN JAR_PATH=$(ls /app/dist_keycloak/*.jar) && \
    mkdir -p /tmp/email-inject/theme/weppino/email && \
    cp -r /app/src/email/. /tmp/email-inject/theme/weppino/email/ && \
    cd /tmp/email-inject && \
    jar uf "$JAR_PATH" theme/

FROM alpine:3.21
COPY --from=builder /app/dist_keycloak/*.jar /theme.jar
