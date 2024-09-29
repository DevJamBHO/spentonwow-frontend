# Use Node.js version 18.18.0 (or an appropriate version)
FROM node:18.18.0-alpine

# Install git (if needed for lefthook)
RUN apk add --no-cache git

# Set the working directory in the container
WORKDIR /app

# Install lefthook globally (if required)
RUN npm install -g lefthook

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Remove devDependencies after build to reduce image size
RUN npm prune --production

# Expose port 3000
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]
