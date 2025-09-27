# Authentication API Integration

This document explains how the authentication system integrates with the new API endpoints.

## API Endpoints

The authentication system now uses the following API endpoints:

1. **Google Login**: `http://localhost:5212/api/auth/google/callback`
2. **Facebook Login**: `http://localhost:5212/api/auth/facebook/callback`
3. **Username/Password Login**: `http://localhost:5212/api/auth/login`
4. **Username/Password Registration**: `http://localhost:5212/api/auth/register`

## How It Works

### Username/Password Authentication

When a user logs in with username and password:
1. The credentials are sent to `http://localhost:5212/api/auth/login`
2. On successful authentication, the API returns a user object and JWT token
3. Both are stored in localStorage (`user` and `authToken`)
4. The user is now authenticated throughout the application

When a user registers with username and password:
1. The registration data is sent to `http://localhost:5212/api/auth/register`
2. On successful registration, the API returns a user object and JWT token
3. Both are stored in localStorage (`user` and `authToken`)
4. The user is automatically logged in

### Social Authentication

For Google and Facebook login:
1. The user is redirected to the respective OAuth endpoints
2. After authentication, the user is redirected back to the application
3. The API handles the OAuth callback and returns user data and token
4. The application stores the user data and token in localStorage

## Token Checking

The system checks for the existence of an `authToken` in localStorage. If no token is found when accessing protected routes, the user is redirected to `http://localhost:5212/api/auth/login`.

## Usage in Components

### Login Modal

The LoginModal component now provides options for all three authentication methods:
- Google login button that calls `loginWithGoogle()`
- Facebook login button that calls `loginWithFacebook()`
- Traditional login form that calls `login(email, password)`
- Registration form that calls `register(name, email, password)`

### Programmatic Usage

You can use any of the authentication methods programmatically by importing the AuthContext:

```typescript
import { useAuth } from '../../contexts/auth-context';

const MyComponent = () => {
  const { login, loginWithGoogle, loginWithFacebook, register, logout } = useAuth();
  
  // Login with username/password
  const handleLogin = async () => {
    const success = await login('user@example.com', 'password');
    // Handle success/failure
  };
  
  // Google login
  const handleGoogleLogin = () => {
    loginWithGoogle();
  };
  
  // Facebook login
  const handleFacebookLogin = () => {
    loginWithFacebook();
  };
  
  // Register
  const handleRegister = async () => {
    const success = await register('John Doe', 'user@example.com', 'password');
    // Handle success/failure
  };
  
  // Logout
  const handleLogout = () => {
    logout();
  };
};
```

## Error Handling

All authentication methods include proper error handling:
- Network errors are caught and displayed to the user
- API error messages are shown in toast notifications
- Failed authentication attempts do not store any data