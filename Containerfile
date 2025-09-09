FROM node:22-alpine AS build
WORKDIR /app

# Website reads git state
RUN apk add git

COPY . .

# From .gitlab-ci.yml build step
RUN npm install --global corepack@latest
RUN corepack enable
RUN corepack prepare pnpm@latest-10 --activate
RUN pnpm config set store-dir .pnpm-store
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:alpine AS runtime
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080