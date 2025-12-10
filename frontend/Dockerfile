# Build stage
FROM node:22.8.0-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite environment variables must be available at BUILD time
ARG VITE_APP_BACKEND_URL=http://localhost:8002
ENV VITE_APP_BACKEND_URL=${VITE_APP_BACKEND_URL}

# Build the Vue app for production
RUN npm run build

# Production stage - serve with nginx
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]