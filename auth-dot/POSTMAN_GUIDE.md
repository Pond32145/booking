# Postman Configuration Guide for Authentication System

This guide will help you properly configure Postman to test the authentication system endpoints.

## Common Issues and Solutions

### 1. Missing Content-Type Header
**Problem**: API returns no response or error
**Solution**: Make sure to set the `Content-Type` header correctly

### 2. Incorrect Body Format
**Problem**: API returns 400 Bad Request
**Solution**: Ensure the request body is properly formatted JSON

## Setting up Postman Requests

### Register Endpoint
**URL**: `POST http://localhost:5212/api/auth/register`

**Headers**:
- Key: `Content-Type`
- Value: `application/json`

**Body** (select "raw" and "JSON"):
```json
{
  "email": "postmanuser@example.com",
  "password": "password123",
  "firstName": "Postman",
  "lastName": "User"
}
```

### Login Endpoint
**URL**: `POST http://localhost:5212/api/auth/login`

**Headers**:
- Key: `Content-Type`
- Value: `application/json`

**Body** (select "raw" and "JSON"):
```json
{
  "email": "postmanuser@example.com",
  "password": "password123"
}
```

### Google OAuth Endpoint
**URL**: `POST http://localhost:5212/api/auth/google/callback`

**Headers**:
- Key: `Content-Type`
- Value: `application/x-www-form-urlencoded`

**Body** (select "x-www-form-urlencoded"):
- Key: `email`, Value: `googleuser@example.com`
- Key: `firstName`, Value: `Google`
- Key: `lastName`, Value: `User`
- Key: `providerId`, Value: `google123`

### Facebook OAuth Endpoint
**URL**: `POST http://localhost:5212/api/auth/facebook/callback`

**Headers**:
- Key: `Content-Type`
- Value: `application/x-www-form-urlencoded`

**Body** (select "x-www-form-urlencoded"):
- Key: `email`, Value: `fbuser@example.com`
- Key: `firstName`, Value: `Facebook`
- Key: `lastName`, Value: `User`
- Key: `providerId`, Value: `facebook123`

## Expected Responses

All endpoints should return a JSON response with the following structure:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "user@example.com",
  "firstName": "First",
  "lastName": "Last",
  "expiresAt": "2025-09-20T16:30:50.976Z"
}
```

## Troubleshooting Steps

1. **Check if the application is running**:
   - Open a terminal and run: `curl http://localhost:5212/api/auth/register`
   - You should get a response indicating the endpoint exists

2. **Verify Headers**:
   - For JSON endpoints, always include `Content-Type: application/json`
   - For form endpoints, use `Content-Type: application/x-www-form-urlencoded`

3. **Check Body Format**:
   - JSON endpoints require properly formatted JSON
   - Form endpoints require key-value pairs

4. **Verify Port**:
   - Make sure you're using the correct port (5212 by default)

5. **Check for Errors in Application Console**:
   - Look for any error messages in the terminal where the application is running

## Importing Postman Collection

You can also import the provided Postman collection file `AuthSystem.postman_collection.json` which contains pre-configured requests for all endpoints.