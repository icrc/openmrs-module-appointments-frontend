FROM nginxinc/nginx-unprivileged:1.25-alpine
ARG UID=nginx
ARG GID=nginx

ENV APPOINTMENTS_NGINX_PORT=8080

RUN rm /etc/nginx/conf.d/default.conf
COPY --chown=$UID:$GID default.conf.template /etc/nginx/templates/default.conf.template
COPY --chown=$UID:$GID dist/. /usr/share/nginx/html/appointments