# Use the official Node.js 20.14 image as the base
FROM node:20.14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application using Nodemon
CMD ["npx", "nodemon", "server.js"]