import nodemailer from 'nodemailer';

// Send verification email
export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || '',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || ''
      }
    });

    // Email content
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

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};