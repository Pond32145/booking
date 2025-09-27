# Testing the Authentication System

This document provides instructions on how to test the authentication system using Postman or curl.

## Prerequisites

1. The authentication system must be running locally on `http://localhost:5212`
2. PostgreSQL database must be accessible
3. Postman or curl for making API requests

## API Endpoints

### 1. Register a New User

**Endpoint**: `POST /api/auth/register`
**Content-Type**: `application/json`

**Request Body**:
```json
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Expected Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "test@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "expiresAt": "2025-09-20T16:30:50.976Z"
}
```

### 2. Login with Username/Password

**Endpoint**: `POST /api/auth/login`
**Content-Type**: `application/json`

**Request Body**:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "test@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "expiresAt": "2025-09-20T16:30:50.976Z"
}
```

### 3. Google OAuth Callback

**Endpoint**: `POST /api/auth/google/callback`
**Content-Type**: `application/x-www-form-urlencoded`

**Form Data**:
```
email=googleuser@example.com
firstName=Google
lastName=User
providerId=google123
```

**Expected Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "googleuser@example.com",
  "firstName": "Google",
  "lastName": "User",
  "expiresAt": "2025-09-20T16:32:20.000Z"
}
```

### 4. Facebook OAuth Callback

**Endpoint**: `POST /api/auth/facebook/callback`
**Content-Type**: `application/x-www-form-urlencoded`

**Form Data**:
```
email=fbuser@example.com
firstName=Facebook
lastName=User
providerId=facebook123
```

**Expected Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "fbuser@example.com",
  "firstName": "Facebook",
  "lastName": "User",
  "expiresAt": "2025-09-20T16:33:05.860Z"
}
```

## Testing with Curl

### Register a new user:
```bash
curl -X POST http://localhost:5212/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"John","lastName":"Doe"}'
```

### Login with username/password:
```bash
curl -X POST http://localhost:5212/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Google OAuth callback:
```bash
curl -X POST http://localhost:5212/api/auth/google/callback \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=googleuser@example.com&firstName=Google&lastName=User&providerId=google123"
```

### Facebook OAuth callback:
```bash
curl -X POST http://localhost:5212/api/auth/facebook/callback \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=fbuser@example.com&firstName=Facebook&lastName=User&providerId=facebook123"
```

## Using the JWT Token

Once you receive a JWT token from any of the authentication endpoints, you can use it to authenticate subsequent requests by adding it to the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Common Issues and Troubleshooting

1. **Database Connection Errors**: Ensure PostgreSQL is running and the connection string in `appsettings.json` is correct.

2. **Table Already Exists**: If you get an error about tables already existing, you may need to drop and recreate the database:
   ```bash
   dotnet ef database drop -f
   dotnet ef database update
   ```

3. **Port Conflicts**: If port 5212 is already in use, you can change it in the `Properties/launchSettings.json` file.

4. **CORS Issues**: If you're calling the API from a frontend application, you may need to configure CORS in `Program.cs`.