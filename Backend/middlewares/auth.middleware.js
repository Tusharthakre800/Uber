const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/backlistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser= async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1] ;

    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
        
    }

    const isblacklisted = await blacklistTokenModel.findOne({token : token});
    if (isblacklisted) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    } 
    catch (error) {
        console.error(error);
        res.status(401).json({message: 'Unauthorized'});
    }

}


module.exports.authCaptain= async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1] ;
    

    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isblacklisted = await  blacklistTokenModel.findOne({token});
    
    if (isblacklisted) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded.id);
        req.captain = captain;
        return next();
    } 
    catch (error) {
        // console.error(error);
        res.status(401).json({message: 'Unauthorized'});
    }

}




// const { origin, destination } = req.query;
// const distanceAndTime = await mapService.getDistanceTime(origin, destination);
// const kilometers = distanceAndTime.distance / 1000; // Convert meters to kilometers
// distanceAndTime.kilometers = kilometers.toFixed(2); // Add kilometers with 2 decimal places
// res.status(200).json(distanceAndTime , kilometers);