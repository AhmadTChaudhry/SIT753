# Use the official Node.js image as the base image
FROM node:alpine

# Install supervisor
RUN apt-get update && apt-get install -y supervisor

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the supervisor configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3040

# Start the server
CMD ["npm", "start"]

# Optional: Run tests before starting the server (you can add this in Jenkins pipeline if preferred)
# RUN npm test
