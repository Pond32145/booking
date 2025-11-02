import jwt from 'jsonwebtoken';

// Generate JWT token
export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } as jwt.SignOptions
  );
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
  } catch (error) {
    throw new Error('Invalid token');
  }
};