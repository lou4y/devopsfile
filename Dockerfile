# Use the official Node.js image.
FROM node:22

# Create and change to the app directory.
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install app dependencies.
COPY package.json package-lock.json ./
RUN npm install

# Copy the app files.
COPY . .

# Expose the application port.
EXPOSE 4200

# Start the application.
CMD ["npm", "start"]
