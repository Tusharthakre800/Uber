const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {body, validationResult} = require("express-validator");
const blacklistTokenModel = require('../models/backlistToken.model');

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
