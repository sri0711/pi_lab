#!/bin/bash

# Print a message indicating the start of the deployment process
echo "Starting deployment process..."


# checking node check
if which node > /dev/null; then
  echo "Node.js is installed version: $(node -v)"
else
  echo "Node.js is not installed"
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  source ~/.bashrc
  nvm install --lts
fi

# Check if PM2 is installed
if command -v pm2 > /dev/null; then
  echo "PM2 is installed, version: $(pm2 -v)"
else
  echo "PM2 is not installed"
  npm install pm2 -g
fi


if which docker > /dev/null; then
  echo "Docker is installed, version: $(docker -v)"
else
  echo "Docker is not installed"
  echo "Installing Docker..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  sudo usermod -aG docker $USER
  sudo systemctl start docker
  sudo systemctl enable docker
  sudo apt-get install libffi-dev libssl-dev
  sudo apt install python3-dev
  sudo apt-get install -y python3 python3-pip
  sudo apt install docker-compose
fi


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
