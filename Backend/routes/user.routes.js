const express = require('express');
const router = express.Router();
const {body, validationResult} = require("express-validator");
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').trim().isEmail().withMessage("Invalid email format"),
    body('fullname.firstname').isLength({min: 3}).withMessage("First name must be at least 3 characters long"),
    body('password').isLength({min: 3}).withMessage("Password must be at least 3 characters long"),
], userController.registerUser);

router.post('/login',[
    body('email').trim().isEmail().withMessage("Invalid email format"),
    body('password').trim().isLength({min: 3}).withMessage("Password must be at least 3 characters long"),
], userController.loginUser);

// Forgot password routes
router.post('/forgot-password', [
    body('email').trim().isEmail().withMessage("Invalid email format")
], userController.forgotPassword);

router.post('/reset-password', [
    body('token').notEmpty().withMessage("Token is required"),
    body('password').isLength({min: 3}).withMessage("Password must be at least 3 characters long")
], userController.resetPassword);

router.get("/profile",authMiddleware.authUser,userController.getUserProfile);
router.get("/logout",authMiddleware.authUser,userController.logoutUser);

module.exports = router;