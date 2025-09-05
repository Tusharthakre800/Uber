const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
   fullname:{
    firstname:{ type: String, required: true, minlength: [3, 'First name must be at least 3 characters long'] },
    lastname:{ type: String, minlength:[3, 'Last name must be at least 3 characters long'] }
   },
   email: { type: String, required: true, unique: true, minlength: [7, 'Email must be at least 7 characters long'] },
   password: { type: String, select: false, minlength: [3, 'Password must be at least 3 characters long'] },
   socketId:{ type: String },
   resetPasswordToken: { type: String, default: undefined },
   resetPasswordExpires: { type: Date, default: undefined },
   // Add these fields to the user schema
   googleId: {
       type: String,
       unique: true,
       sparse: true
   },
   isEmailVerified: {
       type: Boolean,
       default: false
   },
 
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;