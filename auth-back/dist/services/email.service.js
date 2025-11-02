"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendVerificationEmail = async (email, token) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST || '',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER || '',
                pass: process.env.EMAIL_PASS || ''
            }
        });
        const verificationUrl = `http://localhost:3001/auth/verify-email/${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER || '',
            to: email,
            subject: 'Verify your email address',
            html: `
        <h2>Email Verification</h2>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>If you didn't create an account, please ignore this email.</p>
      `
        };
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    }
    catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
//# sourceMappingURL=email.service.js.map