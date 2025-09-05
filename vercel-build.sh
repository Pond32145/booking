#!/bin/bash

# Vercel build script for the booking system

echo "Starting build process..."

# Ensure we're in the correct directory
cd "${1:-.}"

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm ci
fi

# Fix permissions if needed
if [ -f "fix-permissions.js" ]; then
  echo "Fixing permissions..."
  node fix-permissions.js
fi

# Try different build approaches
echo "Attempting to build with vite build..."
if npm run build; then
  echo "Build successful!"
  exit 0
fi

echo "Primary build failed, trying fallback build..."
if npm run build:fallback; then
  echo "Fallback build successful!"
  exit 0
fi

echo "All build attempts failed"
exit 1