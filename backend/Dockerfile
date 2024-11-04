# backend/Dockerfile
FROM ghcr.io/railwayapp/nixpacks:latest

# Set working directory and copy application code
WORKDIR /app
COPY . .

# Run Nixpacks to build the Python application environment
RUN nixpacks build -o /app

# Default command to start the backend (adjust as necessary)
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
