# Authentication System

A production-ready authentication system built with .NET 8 that supports:

- Username/Password authentication with double hashing
- Google OAuth authentication
- Facebook OAuth authentication
- JWT token generation
- PostgreSQL database integration

## Features

- **Double Password Hashing**: Passwords are hashed twice using PBKDF2 with SHA256 for enhanced security
- **JWT Tokens**: Secure token-based authentication
- **OAuth Integration**: Sign in with Google and Facebook
- **PostgreSQL**: Database storage for user accounts
- **Entity Framework Core**: ORM for database operations
- **RESTful API**: Clean API endpoints for authentication operations

## Prerequisites

- .NET 8 SDK
- PostgreSQL database
- Google OAuth credentials
- Facebook App credentials

## Setup

1. Clone the repository
2. Update the `appsettings.json` file with your database connection string and OAuth credentials
3. Run the database migrations:
   ```bash
   dotnet ef database update
   ```
4. Run the application:
   ```bash
   dotnet run
   ```

## API Endpoints

### Register a new user
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login with username/password
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Google OAuth callback
```
POST /api/auth/google/callback
Content-Type: application/x-www-form-urlencoded

email=googleuser@example.com&firstName=Google&lastName=User&providerId=google123
```

### Facebook OAuth callback
```
POST /api/auth/facebook/callback
Content-Type: application/x-www-form-urlencoded

email=fbuser@example.com&firstName=Facebook&lastName=User&providerId=facebook123
```

## Testing with Postman

Import the `AuthSystem.postman_collection.json` file into Postman to get a pre-configured collection of requests for testing the authentication system.

## Security Considerations

- Passwords are hashed twice using PBKDF2 with SHA256
- JWT tokens are signed with a secret key
- All communication should be over HTTPS in production
- OAuth secrets should be stored securely and not committed to version control

## Environment Variables

The following environment variables should be configured:

- `ConnectionStrings__DefaultConnection`: PostgreSQL connection string
- `Jwt__Key`: Secret key for JWT token signing (at least 32 characters)
- `Jwt__Issuer`: JWT token issuer
- `Jwt__Audience`: JWT token audience
- `Google__ClientId`: Google OAuth client ID
- `Google__ClientSecret`: Google OAuth client secret
- `Facebook__AppId`: Facebook App ID
- `Facebook__AppSecret`: Facebook App secret