# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Production stage
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=10s --timeout=4s --start-period=5s --retries=5 \
    CMD ["wget", "-q", "--spider", "http://127.0.0.1/"]
CMD ["nginx", "-g", "daemon off;"]
