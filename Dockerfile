# ================================
# SISVAN Dashboard - Production Dockerfile
# Multi-stage build for optimized image
# ================================

# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (better cache)
COPY package*.json ./
RUN npm ci --silent

# Copy source files
COPY . .

# Build arguments for environment variables
ARG VITE_SISVAN_API_URL=https://apidadosabertos.saude.gov.br/v1/sisvan/estado-nutricional

# Set environment variables for build
ENV VITE_SISVAN_API_URL=$VITE_SISVAN_API_URL

# Build the application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
