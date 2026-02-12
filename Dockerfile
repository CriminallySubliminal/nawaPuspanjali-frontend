# Stage 1: Build stage
FROM node:25-alpine3.22 AS builder

WORKDIR /app

# ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["sleep", "infinity"]

# Stage 2: Production stage
# FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY ../nginx/nginx-setup.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
