#!/bin/bash

# Print a message indicating the start of the deployment process
echo "Starting deployment process..."

echo "changing deployment directory..."
cd ~/pi_lab

echo "Stopping and removing old containers..."
docker-compose down

echo "Removing unused Docker containers..."
docker container prune -f

echo "Removing unused Docker images..."
docker image prune -f

echo "Fetching the latest code from Git..."
git pull origin main  # Or the appropriate branch name

echo "Rebuilding the Docker containers..."
docker-compose build

echo "Starting the containers..."
docker-compose up -d

echo "Displaying container status..."
docker-compose ps

# End message
echo "Deployment completed successfully."
