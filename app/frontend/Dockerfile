FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json ./
COPY app/frontend/package.json app/frontend/

FROM base AS deps
RUN npm ci -w=@hacker-news/frontend --include-workspace-root

FROM deps AS build
ARG API_URL
ENV API_URL=${API_URL}
COPY packages packages
COPY tsconfig.base.json tsconfig.base.json
COPY app/frontend app/frontend
RUN npm run build -w=@hacker-news/frontend

FROM nginx:stable-alpine AS production
COPY --from=build /app/app/frontend/nginx/nginx.template /etc/nginx/templates/nginx.template
COPY --from=build /app/app/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD envsubst '$API_URL' < /etc/nginx/templates/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g "daemon off;"