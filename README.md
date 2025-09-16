# Booking System

A modern booking system built with React, TypeScript, and Vite.

## Features
- Service discovery across multiple categories
- Booking management
- User profiles
- Search and filtering capabilities
- Responsive design with mobile support
- Dark/light theme toggle
- SEO optimization
- Motion animations

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Docker Deployment

You can also run this application using Docker:

### Using Dockerfile directly:
```bash
# Build the Docker image
docker build -t booking-system .

# Run the container
docker run -p 3000:3000 booking-system
```

### Using Docker Compose:
```bash
# Build and run using docker-compose
docker-compose up --build
```

The application will be available at http://localhost:3000

## Project Structure
- `src/features`: Feature-specific pages (booking, categories, home, profile, search, support)
- `src/shared`: Reusable components, contexts, data, and hooks
- `public`: Static assets

## Available Scripts
- `dev`: Start development server
- `build`: Build for production
- `preview`: Preview production build locally
- `lint`: Run ESLint