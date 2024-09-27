# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Install necessary packages for building native dependencies
RUN apk add --no-cache python3 make g++ 

# Step 3: Set the working directory inside the container
WORKDIR /app

# Step 4: Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Step 6: Copy the rest of the application code to the container
COPY . .
# Step 5: Install dependencies
RUN npm install


# Step 7: Build the Next.js app
RUN npm run build

# Step 8: Expose port 3000
EXPOSE 3000

# Step 9: Define the command to run your Next.js app
CMD ["npm", "start"]
