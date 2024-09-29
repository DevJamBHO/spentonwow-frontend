# Use Node.js version 18.18.0 (or an appropriate version)
FROM node:18.18.0-alpine

# Install git
RUN apk add --no-cache git

# Set the working directory in the container
WORKDIR /app

# Install lefthook globally
RUN npm install -g lefthook

# Copy package.json and package-lock.json
COPY package*.json ./

# Set NODE_ENV to production to skip lefthook
ENV NODE_ENV=production

# Install dependencies in production mode
RUN npm install --production

RUN next build

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
