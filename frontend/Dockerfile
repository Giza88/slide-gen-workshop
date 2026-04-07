# Stage 1: Build the application
FROM node:24.14-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Default for local/docker-compose style networking; override at runtime if needed.
ENV BACKEND_ORIGIN=http://backend:8000

COPY nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
