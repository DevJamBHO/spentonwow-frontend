# Use Node.js version 18.18.0 (or an appropriate version)
FROM node:18.18.0-alpine

# Set the working directory in the container
WORKDIR /app

# Install lefthook globally
RUN npm install -g lefthook

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install any needed packages
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
