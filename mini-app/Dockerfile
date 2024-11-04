# frontend/Dockerfile
FROM railwayapp/nixpacks:latest

# Set working directory and copy application code
WORKDIR /app
COPY . .

# Run Nixpacks to install Node.js dependencies and build the frontend
RUN nixpacks build -o /app

# Default command to start the frontend
CMD ["npm", "start"]
