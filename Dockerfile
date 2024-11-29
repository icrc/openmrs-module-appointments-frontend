FROM nikolaik/python-nodejs:python3.9-nodejs14 as dev
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN --mount=type=cache,target=/app/node_modules \
    --mount=type=cache,target=/root/.npm \
    npm run preinstall-ci

RUN --mount=type=cache,target=/app/node_modules \
    --mount=type=cache,target=/root/.npm \
    npm ci
RUN --mount=type=cache,target=/app/node_modules \
    --mount=type=cache,target=/root/.npm \
    npm run bundle

FROM nginxinc/nginx-unprivileged:1.25-alpine
ARG UID=nginx
ARG GID=nginx

ENV APPOINTMENTS_NGINX_PORT=8080

RUN rm /etc/nginx/conf.d/default.conf
COPY --chown=$UID:$GID default.conf.template /etc/nginx/templates/default.conf.template
COPY --chown=$UID:$GID --from=dev /app/dist/. /usr/share/nginx/html/appointments