# API Testing Guide

This guide explains how to test the authentication backend API endpoints.

## Prerequisites

1. The authentication service should be running on `http://localhost:3001`
2. The PostgreSQL database should be running on `localhost:5432`

## Testing Tools

You can use any of these tools to test the API:
- curl (command line)
- Postman
- Insomnia
- VS Code REST Client with .http files

## API Endpoints

### 1. User Registration

**Endpoint:** `POST /auth/register`

**Request:**
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully. Please check your email for verification.",
  "user": {
    "id": "uuid-string",
    "email": "test@example.com",
    "username": "testuser"
  },
  "token": "jwt-token-string"
}
```

### 2. Email Verification

**Endpoint:** `GET /auth/verify-email/:token`

After registering, check your email for the verification link. The token will be in the URL.

```bash
curl -X GET http://localhost:3001/auth/verify-email/YOUR_VERIFICATION_TOKEN
```

**Response:**
```json
{
  "message": "Email verified successfully"
}
```

### 3. User Login

**Endpoint:** `POST /auth/login`

**Request:**
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid-string",
    "email": "test@example.com",
    "username": "testuser"
  },
  "token": "jwt-token-string"
}
```

### 4. Google OAuth Login

**Endpoint:** `GET /auth/google`

This will redirect to Google's OAuth page. After authentication, Google will redirect back to the callback URL.

### 5. Facebook OAuth Login

**Endpoint:** `GET /auth/facebook`

This will redirect to Facebook's OAuth page. After authentication, Facebook will redirect back to the callback URL.

### 6. Logout

**Endpoint:** `POST /auth/logout`

**Request:**
```bash
curl -X POST http://localhost:3001/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

## Protected Routes

To access protected routes, include the JWT token in the Authorization header:

```bash
curl -X GET http://localhost:3001/some-protected-route \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Error Responses

All error responses follow this format:

```json
{
  "message": "Error description"
}
```

Common error responses:
- 400: Bad Request (validation errors, invalid credentials)
- 401: Unauthorized (missing or invalid token)
- 404: Not Found (route not found)
- 500: Internal Server Error (server-side errors)

## Testing with cURL Scripts

Create a file called `test-api.sh` with the following content:

```bash
#!/bin/bash

# Variables
BASE_URL="http://localhost:3001"
EMAIL="test@example.com"
USERNAME="testuser"
PASSWORD="password123"

echo "Testing Registration..."
curl -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"username\": \"$USERNAME\",
    \"password\": \"$PASSWORD\",
    \"passwordConfirm\": \"$PASSWORD\"
  }"

echo -e "\n\nTesting Login..."
curl -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\"
  }"

echo -e "\n\nTesting Logout..."
# Note: You'll need to replace YOUR_JWT_TOKEN with an actual token from login
curl -X POST $BASE_URL/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Make it executable and run it:
```bash
chmod +x test-api.sh
./test-api.sh
```

## Testing OAuth Endpoints

For OAuth testing, simply navigate to these URLs in your browser:

1. Google OAuth: http://localhost:3001/auth/google
2. Facebook OAuth: http://localhost:3001/auth/facebook

After successful authentication, you'll receive a JSON response with your user information and JWT token.