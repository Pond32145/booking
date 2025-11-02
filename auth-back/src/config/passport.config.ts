import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { getRepository } from 'typeorm';

// Import models
import { User } from '../models/User';

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const userRepository = getRepository(User);
    
    // Check if user already exists with Google provider
    let user = await userRepository.findOne({
      where: {
        provider: 'google',
        providerId: profile.id
      }
    });
    
    // If user doesn't exist, create new user
    if (!user) {
      // Check if user exists with the same email
      user = await userRepository.findOne({
        where: {
          email: profile.emails ? profile.emails[0].value : ''
        }
      });
      
      if (user) {
        // Update existing user with Google provider info
        user.provider = 'google';
        user.providerId = profile.id;
        user.isVerified = true;
        user = await userRepository.save(user);
      } else {
        // Create new user
        user = userRepository.create({
          email: profile.emails ? profile.emails[0].value : '',
          username: profile.displayName.replace(/\s+/g, '_').toLowerCase(),
          password: '', // No password for OAuth users
          isVerified: true, // OAuth users are automatically verified
          provider: 'google',
          providerId: profile.id
        });
        
        user = await userRepository.save(user);
      }
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Facebook OAuth strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID || '',
  clientSecret: process.env.FACEBOOK_APP_SECRET || '',
  callbackURL: process.env.FACEBOOK_CALLBACK_URL || '/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const userRepository = getRepository(User);
    
    // Check if user already exists with Facebook provider
    let user = await userRepository.findOne({
      where: {
        provider: 'facebook',
        providerId: profile.id
      }
    });
    
    // If user doesn't exist, create new user
    if (!user) {
      // Check if user exists with the same email
      user = await userRepository.findOne({
        where: {
          email: profile.emails && profile.emails[0] ? profile.emails[0].value : ''
        }
      });
      
      if (user) {
        // Update existing user with Facebook provider info
        user.provider = 'facebook';
        user.providerId = profile.id;
        user.isVerified = true;
        user = await userRepository.save(user);
      } else {
        // Create new user
        const firstName = profile.name ? profile.name.givenName : '';
        const lastName = profile.name ? profile.name.familyName : '';
        
        user = userRepository.create({
          email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
          username: `${firstName}_${lastName}`.replace(/\s+/g, '_').toLowerCase(),
          password: '', // No password for OAuth users
          isVerified: true, // OAuth users are automatically verified
          provider: 'facebook',
          providerId: profile.id
        });
        
        user = await userRepository.save(user);
      }
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Serialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id: string, done) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;