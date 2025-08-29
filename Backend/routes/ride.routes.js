const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const rideController = require('../controllers/ride.controller');
const { body, validationResult,query } = require("express-validator");


router.post('/create',
authMiddleware.authUser,
[
    body("pickup").isString().isLength({min: 1}).withMessage("invalid pickup location"),
    body("destination").isString().isLength({min: 1}).withMessage("invalid destination location"),
    body("vehicleType").isString().isLength({min: 1}).withMessage("invalid vehicle type"),
]
    , rideController.createRide);


router.get('/get-fare', 
    authMiddleware.authUser,

    query("pickup").isString().isLength({min: 1}).withMessage("invalid pickup location"),   
    query("destination").isString().isLength({min: 1}).withMessage("invalid destination location"), 
    
    rideController.getFare);


router.post('/confirm',
    authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("invalid ride id"),
    rideController.confirmRide
);

router.get('/start-ride',
    authMiddleware.authCaptain,
    query("rideId").isMongoId().withMessage("invalid ride id"),
    rideController.startRide
);

router.post('/end-ride',
    authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("invalid ride id"),       
    rideController.endRide
);



module.exports = router;