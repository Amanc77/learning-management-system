FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY client/package*.json ./client/
COPY server/package*.json ./server/

RUN cd client && npm install
RUN cd server && npm install

# Copy source
COPY client ./client
COPY server ./server

# Build Vite with more memory
RUN cd client && NODE_OPTIONS="--max-old-space-size=4096" npm run build

# backend
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000

# Copy backend source
COPY --from=builder /app/server ./server

# Copy built frontend into the correct folder
COPY --from=builder /app/client/dist ./client/dist

# Install only production deps
RUN cd server && npm install --omit=dev

EXPOSE 8000

WORKDIR /app/server
CMD ["node", "server.js"]
