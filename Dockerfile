FROM nginxinc/nginx-unprivileged:1.25-alpine
ARG UID=nginx
ARG GID=nginx

COPY --chown=$UID:$GID listen.conf.template /etc/nginx/templates/default.conf.template
COPY --chown=$UID:$GID dist/. /usr/share/nginx/html/appointments