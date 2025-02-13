#!/bin/bash

# Print a message indicating the start of the deployment process
echo "Starting deployment process..."

cd ~/pi_lab

# Step 1: Stop and remove old containers
echo "Stopping and removing old containers..."
docker-compose down

# Step 2: Fetch the latest code from the Git repository
echo "Fetching the latest code from Git..."
git pull origin main  # Or the appropriate branch name

# Step 3: Rebuild the containers (optional, but useful for ensuring you're using the latest image)
echo "Rebuilding the Docker containers..."
docker-compose build

# Step 4: Start the containers up
echo "Starting the containers..."
docker-compose up -d

# Step 5: Optionally, print the status of the containers
echo "Displaying container status..."
docker-compose ps

# End message
echo "Deployment completed successfully."
