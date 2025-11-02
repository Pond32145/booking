import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import crypto from 'crypto';

// Import models
import { User } from '../models/User';

// Import services
import { sendVerificationEmail } from '../services/email.service';

// Import utils
import { generateToken } from '../utils/jwt.utils';

// Register controller
export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, username, password } = req.body;

    // Check if user already exists
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({
      where: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create new user
    const newUser = userRepository.create({
      email,
      username,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
      provider: 'local'
    });

    // Save user to database
    const savedUser = await userRepository.save(newUser);

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Generate JWT token
    const token = generateToken(savedUser.id);

    return res.status(201).json({
      message: 'User registered successfully. Please check your email for verification.',
      user: {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Login controller
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email before logging in' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Verify email controller
export const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { token } = req.params;

    // Find user by verification token
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }

    // Update user as verified
    user.isVerified = true;
    user.verifiedAt = new Date();
    user.verificationToken = null as any;
    await userRepository.save(user);

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// OAuth callback controller
export const oauthCallback = async (req: Request, res: Response): Promise<Response> => {
  try {
    // @ts-ignore
    const user = req.user as User;
    
    // Generate JWT token
    const token = generateToken(user.id);

    return res.status(200).json({
      message: 'Authentication successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      },
      token
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout controller
export const logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};