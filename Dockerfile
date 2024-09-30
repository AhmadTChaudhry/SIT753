# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY start.sh /usr/src/app/start.sh
# Install dependencies
RUN npm install
RUN chmod +x /usr/src/app/start.sh

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3040

# Start the server
# CMD ["npm", "start"]
CMD ["/usr/src/app/start.sh"]

# Optional: Run tests before starting the server (you can add this in Jenkins pipeline if preferred)
# RUN npm test
