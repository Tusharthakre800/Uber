const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const captainService = require('../services/captain.service');
const { validationResult } = require("express-validator");
const blacklistTokenModel = require('../models/backlistToken.model');

// ================= Controllers =================

const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, fullname, vehicle } = req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ captain, token });
};

const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await captain.comparePassword(password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({ captain, token });
};

const getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
};

const logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfully' });
};

// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const captain = await captainModel.findOne({ email });

        if (!captain) {
            return res.status(404).json({ message: 'Captain not found with this email' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        captain.resetPasswordToken = hashedToken;
        captain.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
        await captain.save();

        res.status(200).json({
            message: 'Password reset token sent to email',
            resetToken: resetToken, // 🔴 sirf testing ke liye
            email: email
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error during password reset request' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const captain = await captainModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!captain) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        captain.password = await captainModel.hashPassword(newPassword);
        captain.resetPasswordToken = null;
        captain.resetPasswordExpires = null;
        await captain.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error during password reset' });
    }
};

// ================= Export =================
module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain,
    forgotPassword,
    resetPassword
};
