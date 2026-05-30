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
#
# `jar uf` creates a temp file in the same directory as the JAR.
# /app/dist_keycloak/ has restricted permissions after the keycloakify build,
# so we copy each JAR to /tmp first, update it there, then copy back.
# The loop handles any number of JARs safely (glob expansion is word-split safe
# inside a for-in, unlike $(...) assignment).
RUN mkdir -p /tmp/email-inject/theme/weppino/email && \
    cp -r /app/src/email/. /tmp/email-inject/theme/weppino/email/ && \
    for JAR in /app/dist_keycloak/*.jar; do \
        NAME=$(basename "$JAR"); \
        cp "$JAR" /tmp/email-inject/"$NAME"; \
        cd /tmp/email-inject && jar uf "$NAME" theme/; \
        cp /tmp/email-inject/"$NAME" "$JAR"; \
    done

FROM alpine:3.21
COPY --from=builder /app/dist_keycloak/*.jar /theme.jar
