const express = require('express');
const router = express.Router();
const {body, validationResult} = require("express-validator");
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').trim().isEmail().withMessage("Invalid email"),
    body('fullname.firstname').isLength({min: 1}).withMessage("First name must be at least 2 characters long"),
    body('password').isLength({min: 3}).withMessage("Password must be at least 3 characters long"),
    body("vehicle.color").isLength({min: 3}).withMessage("color must be at least 2 characters long"),
    body("vehicle.plate").isLength({min: 3}).withMessage("plate must be at least 3 characters long"),
    body("vehicle.capacity").isInt({min: 1}).withMessage("capacity must be at least 1 "),
    body("vehicle.vehicleType").isIn(["car", "motorcycle","auto"]).withMessage("invalid vehicle type"),
],
     captainController.registerCaptain
)

router.post('/login',[
    body('email').trim().isEmail().withMessage("Invalid email"),
    body('password').trim().isLength({min: 3}).withMessage("Password must be at least 3 characters long"),
],
     captainController.loginCaptain
)

router.get("/profile",authMiddleware.authCaptain,captainController.getCaptainProfile);

router.get("/logout",authMiddleware.authCaptain,captainController.logoutCaptain);

module.exports = router