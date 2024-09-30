# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3040

# Define environment variable to production
ENV NODE_ENV=production

# Start the server
CMD ["npm", "start"]

# Optional: Run tests before starting the server (you can add this in Jenkins pipeline if preferred)
# RUN npm test
