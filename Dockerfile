# Use official Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy all other app files
COPY . .

# Tell Docker which port to open
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
