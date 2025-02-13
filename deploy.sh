#!/bin/bash

# Print a message indicating the start of the deployment process
echo "Starting deployment process..."

# step 0: change to the deployment directory
echo "changing deployment directory..."
cd ~/pi_lab

# Step 1: Stop and remove old containers
echo "Stopping and removing old containers..."
docker-compose down

# Step 2: Remove old Docker images (optional)
echo "Removing unused Docker images..."
docker image prune -f

# Step 3: Fetch the latest code from the Git repository
echo "Fetching the latest code from Git..."
git pull origin main  # Or the appropriate branch name

# Step 4: Rebuild the containers (optional, but useful for ensuring you're using the latest image)
echo "Rebuilding the Docker containers..."
docker-compose build

# Step 5: Start the containers up
echo "Starting the containers..."
docker-compose up -d

# Step 6: Optionally, print the status of the containers
echo "Displaying container status..."
docker-compose ps

# End message
echo "Deployment completed successfully."
