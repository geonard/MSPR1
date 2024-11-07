# Dockerfile
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Set environment variable for the port
ENV PORT=3000

# Expose the port
EXPOSE $PORT

# Command to run the application
CMD ["node", "server.js"]
