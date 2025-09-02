const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const captainService = require('../services/captain.service');
const {body, validationResult } = require("express-validator");
const blacklistTokenModel = require('../models/backlistToken.model');
// const generateAuthToken = require('../middlewares/auth.middleware');


module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password, fullname, vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});

    if (isCaptainAlreadyExist) {
        return res.status(400).json({massage: 'Captain already exist'});
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

    res.status(201).json({captain, token});
}

module.exports.loginCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');

    if (!captain) {
        return res.status(401).json({massage: 'something went wrong'});
    }

    const isValidPassword = await captain.comparePassword(password);

    if (!isValidPassword) {
        return res.status(401).json({massage: 'something went wrong'});
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({captain, token});

}

module.exports.getCaptainProfile = async (req, res , next) => {

    res.status(200).json( {captain: req.captain});
} 

module.exports.logoutCaptain = async (req, res, next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1] ;

    await blacklistTokenModel.create({token});

    res.clearCookie('token');

    res.status(200).json({massage: 'Logout successfully'});


}


// Add these new functions to the existing captain controller

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        const captain = await captainModel.findOne({ email });
        if (!captain) {
            return res.status(404).json({
                message: 'Captain not found with this email'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Set reset token and expiry (1 hour)
        captain.resetPasswordToken = hashedToken;
        captain.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
        await captain.save();

        // TODO: Send email with reset link
        // For now, return the token in response for testing
        res.status(200).json({
            message: 'Password reset token sent to email',
            resetToken: resetToken, // Remove this in production
            email: email
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            message: 'Server error during password reset request'
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // Hash the token to match stored version
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const captain = await captainModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!captain) {
            return res.status(400).json({
                message: 'Invalid or expired reset token'
            });
        }

        // Update password
        captain.password = await captainModel.hashPassword(newPassword);
        captain.resetPasswordToken = null;
        captain.resetPasswordExpires = null;
        await captain.save();

        res.status(200).json({
            message: 'Password reset successful'
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            message: 'Server error during password reset'
        });
    }
};

// Make sure to export these functions along with existing ones
module.exports = {
    ...existingExports,
    forgotPassword,
    resetPassword
};
