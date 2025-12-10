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

# Production stage - serve with vite preview
FROM node:22.8.0-alpine

WORKDIR /app

# Copy built assets and package files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/vite.config.ts ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]