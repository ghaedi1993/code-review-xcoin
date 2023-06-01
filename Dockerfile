# Use the official Node.js image as the base image
FROM node:19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the project
RUN npm run build

ARG PORT
ARG DOCKER_CONTAINER

# We add DOCKER_CONTAINER and PORT as ENV_VAR 
ENV DOCKER_CONTAINER=${DOCKER_CONTAINER}

# Expose the port
EXPOSE ${PORT}

# Start application
CMD ["npm", "run", "start"]