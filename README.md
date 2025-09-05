# Booking System

This is a modern booking system built with React, TypeScript, Tailwind CSS, and HeroUI components. The system provides a seamless experience for users to discover, search, and book various services across multiple categories.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Note: If you encounter minification errors during build, ensure Terser is installed:
```bash
npm install --save-dev terser
```

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (using npx for Vite)
- `npm run build:types` - Build with TypeScript type checking
- `npm run build:fallback` - Fallback build using npx for tsc and Vite
- `npm run build:direct` - Direct node execution of Vite build
- `npm run fix:perms` - Fix common permission issues
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Troubleshooting Build Issues

### Permission Denied Error

If you encounter a "Permission denied" error when building:

1. Try using the fallback build script:
   ```bash
   npm run build:fallback
   ```

2. Try direct node execution:
   ```bash
   npm run build:direct
   ```

3. Fix permissions manually:
   ```bash
   npm run fix:perms
   ```

4. For Vercel deployments, use the vercel-build.sh script

### Deployment to Vercel

For Vercel deployments, you can use the provided build script:

```bash
./vercel-build.sh
```

## Technology Stack

- React 18
- TypeScript
- Vite 6
- Tailwind CSS 4
- HeroUI React Components
- Framer Motion
- React Router DOM
