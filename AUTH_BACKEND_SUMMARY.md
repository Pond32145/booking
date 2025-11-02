# Authentication Backend System - Summary

## Overview
We have created a complete authentication backend system with the following features:

1. Local authentication (email/password with email verification)
2. Google OAuth authentication
3. Facebook OAuth authentication
4. PostgreSQL database integration
5. Docker/Podman containerization

## Folder Structure
```
auth-back/
├── src/
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── models/
│   │   └── User.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── services/
│   │   └── email.service.ts
│   ├── middleware/
│   │   └── validator.ts
│   ├── utils/
│   │   └── jwt.utils.ts
│   ├── config/
│   │   └── passport.config.ts
│   └── server.ts
├── package.json
├── tsconfig.json
├── .env
├── Dockerfile
├── PODMAN_INSTRUCTIONS.md
└── README.md
```

## Features Implemented

### 1. Local Authentication
- User registration with email, username, password
- Password hashing with bcrypt
- Email verification with token generation
- Login with email and password
- JWT token generation for sessions

### 2. OAuth Authentication
- Google OAuth 2.0 integration
- Facebook OAuth integration
- Automatic user creation/updating for OAuth users

### 3. Database
- PostgreSQL database with TypeORM
- User entity with all required fields
- Automatic schema synchronization

### 4. Security
- Password hashing with bcrypt
- JWT-based authentication
- Input validation with express-validator
- Rate limiting
- CORS protection
- Helmet security middleware

## Environment Variables
The system requires the following environment variables (set in the .env file):

```
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=booking
DB_PASSWORD=4qMbHKGqe/2dCw==
DB_NAME=booking_auth
DB_TYPE=postgres

# JWT Configuration
JWT_SECRET=booking_auth_secret_key
JWT_EXPIRES_IN=1d

# Google OAuth Configuration
GOOGLE_CLIENT_ID=1031863636264-u0egg348a1rec0eq2gku7ac75q3n735p.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

# Facebook OAuth Configuration
FACEBOOK_APP_ID=1147647373893210
FACEBOOK_APP_SECRET=1049ec99265b24998fdb5aad1fec78a0
FACEBOOK_CALLBACK_URL=http://localhost:3001/auth/facebook/callback

# Email Configuration (for verification)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## API Endpoints

### Authentication Routes
- `POST /auth/register` - Register a new user
  - Body: `{ email, username, password, passwordConfirm }`
  
- `POST /auth/login` - Login with email and password
  - Body: `{ email, password }`
  
- `GET /auth/verify-email/:token` - Verify email with token
  
- `GET /auth/google` - Google OAuth login
  
- `GET /auth/google/callback` - Google OAuth callback
  
- `GET /auth/facebook` - Facebook OAuth login
  
- `GET /auth/facebook/callback` - Facebook OAuth callback
  
- `POST /auth/logout` - Logout

## Running the Application

### With Docker:
1. Start the database: `docker-compose up -d postgres`
2. Start the auth service: `docker-compose up -d auth-service`

### With Podman:
1. Start the database: `podman-compose up -d postgres`
2. Start the auth service: `podman-compose up -d auth-service`

### Development Mode:
1. Install dependencies: `cd auth-back && npm install`
2. Run in development mode: `npm run dev`

## Database Schema

The User entity contains the following fields:
- id (UUID)
- email (string, unique)
- username (string, unique)
- password (string, hashed)
- isVerified (boolean)
- provider (string, e.g., 'local', 'google', 'facebook')
- providerId (string, for OAuth provider user ID)
- verificationToken (string, for email verification)
- verifiedAt (timestamp)
- createdAt (timestamp)
- updatedAt (timestamp)

## Security Considerations

1. Passwords are hashed using bcrypt with 10 salt rounds
2. JWT tokens are used for session management
3. Email verification is required for local accounts
4. Input validation is implemented for all endpoints
5. Rate limiting is applied to prevent abuse
6. CORS and Helmet middleware provide additional security