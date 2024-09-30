#!/bin/bash

# Start the server in the background
node controller.js &

# Wait for the server to start (adjust as necessary)
sleep 5

# Run the tests
npm test

# Wait indefinitely to keep the container running
wait
