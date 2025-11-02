import express from 'express';
import { body } from 'express-validator';
import passport from 'passport';

// Import controllers
import * as authController from '../controllers/auth.controller';

// Import middleware
import { validate } from '../middleware/validator';

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('username').isLength({ min: 3 }).trim().escape(),
    body('password').isLength({ min: 6 }),
    body('passwordConfirm').custom((value: string, { req }: any) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ],
  validate,
  authController.register
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists(),
  ],
  validate,
  authController.login
);

// Verify email route
router.get('/verify-email/:token', authController.verifyEmail);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.oauthCallback
);

// Facebook OAuth routes
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  authController.oauthCallback
);

// Logout route
router.post('/logout', authController.logout);

export default router;