const captainModel = require('../models/captain.model');
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