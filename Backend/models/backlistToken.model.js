const mongoose = require('mongoose');

const backlistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,

        default: Date.now,
        expires: 86400 // 24 hours in second
    }
});

module.exports = mongoose.model('backlistToken', backlistTokenSchema);