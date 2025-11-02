"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.oauthCallback = exports.verifyEmail = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeorm_1 = require("typeorm");
const crypto_1 = __importDefault(require("crypto"));
const User_1 = require("../models/User");
const email_service_1 = require("../services/email.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const existingUser = await userRepository.findOne({
            where: [{ email }, { username }]
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'User with this email or username already exists'
            });
        }
        const saltRounds = 10;
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
        const newUser = userRepository.create({
            email,
            username,
            password: hashedPassword,
            verificationToken,
            isVerified: false,
            provider: 'local'
        });
        const savedUser = await userRepository.save(newUser);
        await (0, email_service_1.sendVerificationEmail)(email, verificationToken);
        const token = (0, jwt_utils_1.generateToken)(savedUser.id);
        return res.status(201).json({
            message: 'User registered successfully. Please check your email for verification.',
            user: {
                id: savedUser.id,
                email: savedUser.email,
                username: savedUser.username
            },
            token
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: 'Please verify your email before logging in' });
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = (0, jwt_utils_1.generateToken)(user.id);
        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            },
            token
        });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = await userRepository.findOne({ where: { verificationToken: token } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }
        user.isVerified = true;
        user.verifiedAt = new Date();
        user.verificationToken = null;
        await userRepository.save(user);
        return res.status(200).json({ message: 'Email verified successfully' });
    }
    catch (error) {
        console.error('Email verification error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.verifyEmail = verifyEmail;
const oauthCallback = async (req, res) => {
    try {
        const user = req.user;
        const token = (0, jwt_utils_1.generateToken)(user.id);
        return res.status(200).json({
            message: 'Authentication successful',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            },
            token
        });
    }
    catch (error) {
        console.error('OAuth callback error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.oauthCallback = oauthCallback;
const logout = async (req, res) => {
    try {
        return res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map