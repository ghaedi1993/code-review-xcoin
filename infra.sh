#!/bin/bash

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

# Check if the mongo:latest container is running
if ! docker ps | grep -q "mongo:latest"; then
    echo "The mongo:latest container is not running. Starting the container..."
    docker run -d -p 27017:27017 --name mongodb -v mongo_data:/data/db --rm mongo:latest mongod --noauth
else
    echo "The mongo:latest container is already running."
fi
