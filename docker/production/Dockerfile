# Stage 1: Build
FROM node:22.18.0-alpine as builder

# Set the working directory
WORKDIR /auth-app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Production
FROM node:22.18.0-alpine as production

# Set environment to production
ENV NODE_ENV=prod

# Set the working directory
WORKDIR /auth-app

# Copy package.json and package-lock.json for production dependencies
COPY package*.json ./

# Install production dependencies
RUN npm ci --ignore-scripts

# Copy the build output from the builder stage
COPY --from=builder /auth-app/dist ./

# Copy public assets (for Express static serving)
COPY --from=builder /auth-app/public ./

# Copy the .env.prod file to the root of the project
# COPY --from=builder /auth-app/.env.prod ./

# Expose the application port
EXPOSE 5001

# # Set environment variables
# ENV PORT=5501
ENV NODE_ENV=prod

# Default command
CMD [ "node", "src/server.js" ]
