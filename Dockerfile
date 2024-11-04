# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /app

# Install app dependencies.
COPY package.json package-lock.json ./
RUN npm install

# Copy the app files.
COPY . .

# Define build arguments for the environment variables
ARG API_URL

# Set the environment variables
ENV API_URL=${API_URL}

# Expose the application port.
EXPOSE 4200

# Start the application.
CMD ["npm", "start"]
