"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        let user = await userRepository.findOne({
            where: {
                provider: 'google',
                providerId: profile.id
            }
        });
        if (!user) {
            user = await userRepository.findOne({
                where: {
                    email: profile.emails ? profile.emails[0].value : ''
                }
            });
            if (user) {
                user.provider = 'google';
                user.providerId = profile.id;
                user.isVerified = true;
                user = await userRepository.save(user);
            }
            else {
                user = userRepository.create({
                    email: profile.emails ? profile.emails[0].value : '',
                    username: profile.displayName.replace(/\s+/g, '_').toLowerCase(),
                    password: '',
                    isVerified: true,
                    provider: 'google',
                    providerId: profile.id
                });
                user = await userRepository.save(user);
            }
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
}));
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_APP_ID || '',
    clientSecret: process.env.FACEBOOK_APP_SECRET || '',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || '/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        let user = await userRepository.findOne({
            where: {
                provider: 'facebook',
                providerId: profile.id
            }
        });
        if (!user) {
            user = await userRepository.findOne({
                where: {
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : ''
                }
            });
            if (user) {
                user.provider = 'facebook';
                user.providerId = profile.id;
                user.isVerified = true;
                user = await userRepository.save(user);
            }
            else {
                const firstName = profile.name ? profile.name.givenName : '';
                const lastName = profile.name ? profile.name.familyName : '';
                user = userRepository.create({
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
                    username: `${firstName}_${lastName}`.replace(/\s+/g, '_').toLowerCase(),
                    password: '',
                    isVerified: true,
                    provider: 'facebook',
                    providerId: profile.id
                });
                user = await userRepository.save(user);
            }
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = await userRepository.findOne({ where: { id } });
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
});
exports.default = passport_1.default;
//# sourceMappingURL=passport.config.js.map