# Step 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies (First copy only package files)
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Now copy the rest of the app's code to the container (this includes src, pages, etc.)
COPY . .

# Build the application for production
RUN npm run build

# Step 2: Production image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install production dependencies (Copy package files again)
COPY package*.json ./
RUN npm install --only=production

# Copy the production build files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set NODE_ENV to production
ENV NODE_ENV production

# Expose the port that Next.js uses
EXPOSE 3000

# Start the Next.js server in production mode
CMD ["npm", "run", "start"]
