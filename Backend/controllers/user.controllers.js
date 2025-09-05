const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {body, validationResult} = require("express-validator");
const blacklistTokenModel = require('../models/backlistToken.model');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const app = require('../app');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports.registerUser = async (req, res,next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password, fullname} = req.body;

    const isUserAlreadyExist = await userModel.findOne({email});

    if (isUserAlreadyExist) {
        return res.status(401).json({massage: 'user already exists'});
    }

    const hashPassword = await userModel.hashPassword(password);
    
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user});

}

module.exports.loginUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select("+password")

    if (!user) {
        return res.status(401).json({massage: 'something went wrong'});
    }

    const isMatch = await userModel.findOne({email}).select('+password');

    if (!isMatch) {    
        return res.status(401).json({massage: 'something went wrong'});
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
        return res.status(401).json({massage: 'something went wrong'});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token, user});

}

module.exports.getUserProfile = (req, res) =>{
    res.status(200).json( req.user);
}

module.exports.logoutUser = async (req, res) =>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1] ;

    await blacklistTokenModel.create({token});

    res.status(200).json({massage: 'Logout successfully'});
}

module.exports.forgotPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Set token and expiry (10 minutes)
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const resetUrl = `${process.env.FRONTEND_URL}/user-reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 10 minutes.</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports.resetPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { token, password } = req.body;

    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await userModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update password
        user.password = await userModel.hashPassword(password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports.googleLoginUser = async (req, res) => {
    const { credential } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub, email, given_name, family_name } = payload;

        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userService.createGoogleUser({
            firstname: given_name,
            lastname: family_name,
            email,
            googleId: sub,
            isEmailVerified: true,
        });
        } else {
            // Update existing user with Google info
            if (!user.googleId) {
                user.googleId = sub;
                user.isEmailVerified = true;
                await user.save();
            }
        }

        const token = user.generateAuthToken();
        
        res.cookie('token', token);
        res.status(200).json({ token, user });

    } catch (error) {
        console.error('Google login error:', error);
        res.status(401).json({ message: 'Invalid Google token' });
    }
};
