# Booking System - Authentication Backend Project Summary

## Project Overview

This project implements a complete authentication backend system for a booking application with the following capabilities:

1. **Local Authentication**: Email/password registration and login with email verification
2. **OAuth Integration**: Google and Facebook authentication
3. **Database Management**: PostgreSQL with TypeORM
4. **Containerization**: Docker and Podman support
5. **API Documentation**: Complete API endpoints with testing instructions

## Project Structure

```
booking/
├── auth-back/                 # Authentication backend
│   ├── src/                   # Source code
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Custom middleware
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utility functions
│   │   └── server.ts          # Main application entry point
│   ├── .env                   # Environment variables
│   ├── Dockerfile             # Docker configuration
│   ├── package.json           # Dependencies and scripts
│   ├── tsconfig.json          # TypeScript configuration
│   ├── README.md              # Backend documentation
│   ├── PODMAN_INSTRUCTIONS.md # Podman setup guide
│   └── API_TESTING.md         # API testing guide
├── docker-compose.yml         # Container orchestration
└── AUTH_BACKEND_SUMMARY.md    # Backend system documentation
```

## Authentication Features

### Local Authentication
- User registration with email, username, and password
- Password hashing with bcrypt
- Email verification workflow with token generation
- Login with email and password
- JWT-based session management

### OAuth Authentication
- Google OAuth 2.0 integration
- Facebook OAuth integration
- Automatic user creation for new OAuth users
- Linking of existing accounts with OAuth providers

### Security Measures
- Input validation using express-validator
- Rate limiting to prevent abuse
- CORS protection
- Helmet security middleware
- Environment-based configuration

## Database Schema

The system uses PostgreSQL with a single `users` table containing:

- `id`: UUID primary key
- `email`: Unique email address
- `username`: Unique username
- `password`: Hashed password (bcrypt)
- `isVerified`: Email verification status
- `provider`: Authentication method ('local', 'google', 'facebook')
- `providerId`: OAuth provider user ID
- `verificationToken`: Email verification token
- `verifiedAt`: Email verification timestamp
- `createdAt`: User creation timestamp
- `updatedAt`: User update timestamp

## API Endpoints

### Authentication Routes
- `POST /auth/register`: User registration
- `POST /auth/login`: User login
- `GET /auth/verify-email/:token`: Email verification
- `GET /auth/google`: Google OAuth initiation
- `GET /auth/google/callback`: Google OAuth callback
- `GET /auth/facebook`: Facebook OAuth initiation
- `GET /auth/facebook/callback`: Facebook OAuth callback
- `POST /auth/logout`: User logout

## Deployment Options

### Docker Deployment
```bash
docker-compose up -d
```

### Podman Deployment
```bash
podman-compose up -d
```

### Development Mode
```bash
cd auth-back
npm install
npm run dev
```

## Environment Configuration

The system requires the following environment variables:

- Database credentials (host, port, username, password, database name)
- JWT secret and expiration settings
- Google OAuth client ID and secret
- Facebook App ID and secret
- Email configuration for verification emails

## Testing

The project includes comprehensive testing documentation with examples for:
- Registration and login workflows
- Email verification process
- OAuth authentication flows
- Protected route access
- Error handling scenarios

## Technologies Used

- **Backend**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with TypeORM
- **Authentication**: Passport.js
- **Validation**: express-validator
- **Security**: bcrypt, helmet, CORS
- **Containerization**: Docker/Podman with docker-compose
- **Testing**: curl-based API testing examples

## Next Steps

To run this system:

1. Install dependencies: `cd auth-back && npm install`
2. Configure environment variables in the `.env` file
3. Choose your containerization method:
   - Docker: `docker-compose up -d`
   - Podman: `podman-compose up -d`
4. Test the API using the examples in `API_TESTING.md`

The system will be available at `http://localhost:3001` with the PostgreSQL database at `localhost:5432`.