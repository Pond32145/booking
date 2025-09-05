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

# Install terser if not present
if ! npm list terser >/dev/null 2>&1; then
  echo "Installing terser..."
  npm install --save-dev terser
fi

# Fix permissions if needed
if [ -f "fix-permissions.js" ]; then
  echo "Fixing permissions..."
  node fix-permissions.cjs
fi

# Try different build approaches
echo "Attempting to build with npx vite build..."
if npx vite build; then
  echo "Build successful!"
  exit 0
fi

echo "Primary build failed, trying fallback build..."
if npm run build:fallback; then
  echo "Fallback build successful!"
  exit 0
fi

echo "Fallback build failed, trying direct node execution..."
if npm run build:direct; then
  echo "Direct build successful!"
  exit 0
fi

echo "All build attempts failed"
exit 1