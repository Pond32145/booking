# Postman Instructions for Authentication System

This guide will help you properly configure and use Postman to test all authentication endpoints.

## Prerequisites

1. Make sure the authentication system is running on `http://localhost:5212`
2. Have Postman installed

## Setting up Postman Requests

### 1. Register a New User

**Method**: POST
**URL**: `http://localhost:5212/api/auth/register`

**Headers**:
- Key: `Content-Type`
- Value: `application/json`

**Body** (select "raw" and "JSON"):
```json
{
  "email": "postmanuser@example.com",
  "password": "postman123",
  "firstName": "Postman",
  "lastName": "User"
}
```

**Expected Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "postmanuser@example.com",
  "firstName": "Postman",
  "lastName": "User",
  "expiresAt": "2025-09-20T17:00:00.000Z"
}
```

### 2. Login with Existing User

**Method**: POST
**URL**: `http://localhost:5212/api/auth/login`

**Headers**:
- Key: `Content-Type`
- Value: `application/json`

**Body** (select "raw" and "JSON"):
```json
{
  "email": "postmanuser@example.com",
  "password": "postman123"
}
```

**Expected Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "postmanuser@example.com",
  "firstName": "Postman",
  "lastName": "User",
  "expiresAt": "2025-09-20T17:00:00.000Z"
}
```

### 3. Google OAuth Callback

**Method**: POST
**URL**: `http://localhost:5212/api/auth/google/callback`

**Headers**:
- Key: `Content-Type`
- Value: `application/x-www-form-urlencoded`

**Body** (select "x-www-form-urlencoded"):
- Key: `email`, Value: `googleuser@example.com`
- Key: `firstName`, Value: `Google`
- Key: `lastName`, Value: `User`
- Key: `providerId`, Value: `google123`

**Expected Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "googleuser@example.com",
  "firstName": "Google",
  "lastName": "User",
  "expiresAt": "2025-09-20T17:00:00.000Z"
}
```

### 4. Facebook OAuth Callback

**Method**: POST
**URL**: `http://localhost:5212/api/auth/facebook/callback`

**Headers**:
- Key: `Content-Type`
- Value: `application/x-www-form-urlencoded`

**Body** (select "x-www-form-urlencoded"):
- Key: `email`, Value: `fbuser@example.com`
- Key: `firstName`, Value: `Facebook`
- Key: `lastName`, Value: `User`
- Key: `providerId`, Value: `facebook123`

**Expected Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "fbuser@example.com",
  "firstName": "Facebook",
  "lastName": "User",
  "expiresAt": "2025-09-20T17:00:00.000Z"
}
```

## Common Issues and Solutions

### Issue 1: "User already exists" Error
**Cause**: Trying to register with an email that's already in the database
**Solution**: Use a different email address or delete the existing user from the database

### Issue 2: "Invalid email or password" Error
**Cause**: Incorrect email or password
**Solution**: Verify that you're using the correct credentials that were used during registration

### Issue 3: No Response or Empty Response
**Cause**: Missing or incorrect Content-Type header
**Solution**: Make sure to set the Content-Type header correctly:
- For JSON requests: `Content-Type: application/json`
- For form requests: `Content-Type: application/x-www-form-urlencoded`

### Issue 4: CORS Errors
**Cause**: Calling the API from a browser-based application
**Solution**: The backend doesn't currently have CORS configured. If you need to call it from a frontend application, CORS middleware would need to be added to the backend.

## Using the JWT Token

Once you receive a JWT token from any of the authentication endpoints, you can use it to authenticate subsequent requests by adding it to the Authorization header:

**Header**:
- Key: `Authorization`
- Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Testing with curl

If you prefer to use curl instead of Postman, here are the equivalent commands:

### Register a new user:
```bash
curl -X POST http://localhost:5212/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"curluser@example.com","password":"curl123","firstName":"Curl","lastName":"User"}'
```

### Login with existing user:
```bash
curl -X POST http://localhost:5212/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"curluser@example.com","password":"curl123"}'
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

## Security Notes

1. Passwords are hashed twice using PBKDF2 with SHA256 for enhanced security
2. JWT tokens are signed with a secret key and have a 60-minute expiration time
3. All communication should be over HTTPS in production
4. OAuth secrets should be stored securely and not committed to version control