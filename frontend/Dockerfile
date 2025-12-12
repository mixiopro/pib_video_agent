# Build stage
FROM node:22.8.0-alpine AS build

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Vite environment variables must be available at BUILD time
ARG VITE_APP_BACKEND_URL=http://localhost:8002
ENV VITE_APP_BACKEND_URL=${VITE_APP_BACKEND_URL}

# Build the Vue app for production
RUN pnpm run build

# Production stage - serve with vite preview
FROM node:22.8.0-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Copy built assets and package files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/vite.config.ts ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 4173
CMD ["pnpm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]