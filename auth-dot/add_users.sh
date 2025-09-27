#!/bin/bash

# Script to add multiple users to the authentication system

echo "Adding users to the authentication system..."

# Add user 1
echo "Adding user 1..."
curl -X POST http://localhost:5212/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@example.com","password":"password123","firstName":"Alice","lastName":"Smith"}'

echo -e "\n"

# Add user 2
echo "Adding user 2..."
curl -X POST http://localhost:5212/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user2@example.com","password":"password123","firstName":"Bob","lastName":"Johnson"}'

echo -e "\n"

# Add user 3
echo "Adding user 3..."
curl -X POST http://localhost:5212/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user3@example.com","password":"password123","firstName":"Charlie","lastName":"Brown"}'

echo -e "\n"

# Add user 4 with Google OAuth
echo "Adding Google user..."
curl -X POST http://localhost:5212/api/auth/google/callback \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=googleuser@example.com&firstName=Google&lastName=User&providerId=google123"

echo -e "\n"

# Add user 5 with Facebook OAuth
echo "Adding Facebook user..."
curl -X POST http://localhost:5212/api/auth/facebook/callback \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=facebookuser@example.com&firstName=Facebook&lastName=User&providerId=facebook123"

echo -e "\n"

echo "All users added successfully!"