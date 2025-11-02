# Authentication Backend Service

This is a TypeScript-based authentication service that provides:

- Local authentication (email/password)
- Google OAuth authentication
- Facebook OAuth authentication
- Email verification for local accounts

## Features

- User registration with email verification
- User login with multiple authentication methods
- JWT-based session management
- PostgreSQL database storage
- Docker/Podman containerization

## Prerequisites

- Node.js 16+
- Docker or Podman (for containerized deployment)
- PostgreSQL (when running without containers)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env` file

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Run in production mode:
   ```bash
   npm start
   ```

## Docker Deployment

To run the entire stack with Docker:
```bash
docker-compose up -d
```

This will start both the PostgreSQL database and the authentication service.

## Podman Deployment

To run the entire stack with Podman:
```bash
podman-compose up -d
```

See [PODMAN_INSTRUCTIONS.md](PODMAN_INSTRUCTIONS.md) for detailed Podman setup instructions.

## API Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with email and password
- `GET /auth/verify-email/:token` - Verify email with token
- `GET /auth/google` - Google OAuth login
- `GET /auth/facebook` - Facebook OAuth login
- `POST /auth/logout` - Logout

## Environment Variables

Check the `.env` file for all required configuration variables.

## Testing

See [API_TESTING.md](API_TESTING.md) for detailed API testing instructions.