FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json ./
COPY app/backend/package.json app/backend/package.json

FROM base AS build-deps
RUN npm ci -w=@hacker-news/backend --include-workspace-root

FROM base AS prod-deps
RUN npm ci -w=@hacker-news/backend --include-workspace-root --omit=dev

FROM build-deps AS build
COPY packages packages
COPY tsconfig.base.json tsconfig.base.json
COPY app/backend app/backend
RUN npm run build -w=@hacker-news/backend

FROM base AS production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/app/backend/dist ./app/backend/dist
COPY --from=build /app/app/backend/.sequelizerc ./app/backend/.sequelizerc

EXPOSE 3001

CMD ["npm", "run", "serve:docker", "-w=@hacker-news/backend"]