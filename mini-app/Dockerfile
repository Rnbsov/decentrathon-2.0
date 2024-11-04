# frontend/Dockerfile
FROM node:latest

# Set working directory and copy application code
WORKDIR /app
COPY . .

# Run Nixpacks to install Node.js dependencies and build the frontend
RUN npm i

RUN npm run build

# Default command to start the frontend
CMD ["npm", "start"]
