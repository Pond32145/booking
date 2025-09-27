# Token Checking Functionality

This document explains how to use the token checking functionality in the AuthContext.

## Overview

The AuthContext now includes a `checkToken` function that verifies if a token exists in localStorage. If no token is found, it automatically redirects the user to `http://localhost:5212/api/auth/login` to obtain a token.

## How It Works

1. The `checkToken` function checks for the existence of an `authToken` in localStorage
2. If no token is found, it redirects the user to the login page at `http://localhost:5212/api/auth/login`
3. If a token exists, the function does nothing and allows normal operation

## Usage

### In Protected Routes

The `ProtectedRoute` component automatically uses the `checkToken` function. When a user tries to access a protected route without authentication, they will be redirected to obtain a token if one doesn't exist.

### Manual Usage

You can also manually trigger token checking in any component by using the `checkToken` function from the AuthContext:

```typescript
import { useAuth } from '../../contexts/auth-context';

const MyComponent = () => {
  const { checkToken } = useAuth();
  
  useEffect(() => {
    checkToken();
  }, [checkToken]);
  
  // ... rest of component
};
```

## Token Storage

Tokens are stored in localStorage with the key `authToken`. When a user authenticates successfully through any method (username/password, Google, or Facebook), a token is automatically stored. When a user logs out, the token is removed.

## Customization

To change the redirect URL, modify the `checkToken` function in `auth-context.tsx`:

```typescript
const checkToken = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    // Change this URL to your desired login endpoint
    window.location.href = 'http://localhost:5212/api/auth/login';
  }
};
```

## API Integration

The AuthContext now integrates with the following API endpoints:

1. **Google Login**: `http://localhost:5212/api/auth/google/callback`
2. **Facebook Login**: `http://localhost:5212/api/auth/facebook/callback`
3. **Username/Password Login**: `http://localhost:5212/api/auth/login`
4. **Username/Password Registration**: `http://localhost:5212/api/auth/register`

See [AUTH_API_INTEGRATION.md](file:///c:/Users/naphat_l/play-code/HeroUi/123/src/shared/contexts/AUTH_API_INTEGRATION.md) for more details on API integration.