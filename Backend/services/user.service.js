const userModel = require('../models/user.model');

module.exports.createUser = async({
    firstname,
    lastname,
    email,
    password
}) => {
    if(!firstname || !lastname || !email || !password) {
        throw new Error('All fields are required')
    }

    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user
}

// Google login के लिए नया function
module.exports.createGoogleUser = async({
    firstname,
    lastname,
    email,
    googleId,
    isEmailVerified,
    
}) => {
    if(!firstname || !lastname || !email || !googleId) {
        throw new Error('All fields are required for Google login')
    }

    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        googleId,
        isEmailVerified: isEmailVerified || true,
        avatar: avatar || null
    })

    return user
}