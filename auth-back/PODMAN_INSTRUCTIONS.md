# Using Podman with the Authentication Backend

This guide explains how to use Podman instead of Docker to run the authentication backend services.

## Prerequisites

1. Install Podman on your system:
   - For Windows: Install Podman Desktop from https://podman-desktop.io/
   - For macOS: `brew install podman` or download from https://podman-desktop.io/
   - For Linux: Follow the instructions at https://podman.io/getting-started/installation

2. Install Podman Compose:
   ```bash
   pip3 install podman-compose
   ```

## Running the Services with Podman

1. Start the PostgreSQL database:
   ```bash
   podman-compose up -d postgres
   ```

2. Start both services (database and auth service):
   ```bash
   podman-compose up -d
   ```

3. Stop the services:
   ```bash
   podman-compose down
   ```

## Building the Auth Service Image

If you need to build the auth service image separately:
```bash
podman build -t booking-auth-service ./auth-back
```

## Running the Auth Service with Podman

After building the image, you can run it directly:
```bash
podman run -d \
  --name booking-auth-service \
  -p 3001:3001 \
  -e DB_HOST=localhost \
  -e DB_PORT=5432 \
  -e DB_USERNAME=booking \
  -e DB_PASSWORD=4qMbHKGqe/2dCw== \
  -e DB_NAME=booking_auth \
  booking-auth-service
```

## Connecting to the Database

The PostgreSQL database will be available at:
- Host: localhost
- Port: 5432
- Database: booking_auth
- Username: booking
- Password: 4qMbHKGqe/2dCw==

## Troubleshooting

1. If you encounter permission issues, try:
   ```bash
   podman machine start
   ```

2. If the build fails, make sure you have installed all dependencies:
   ```bash
   cd auth-back
   npm install
   npm run build
   ```

3. To view logs:
   ```bash
   podman-compose logs
   ```

4. To access the running containers:
   ```bash
   podman ps
   podman exec -it booking-postgres /bin/bash
   ```