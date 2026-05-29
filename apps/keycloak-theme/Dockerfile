FROM node:20-alpine AS builder
RUN apk add --no-cache maven && npm install -g bun
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build-keycloak-theme

FROM alpine:3.21
COPY --from=builder /app/dist_keycloak/*.jar /theme.jar
