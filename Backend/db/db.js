
// Add to Backend/db/db.js
const mongoose = require('mongoose');

function connectTodb(){
   mongoose.connect(process.env.DB_CONNECTION, {
        maxPoolSize: 10,
        minPoolSize: 2,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 5000,
        family: 4
   })
   .then(() => console.log('Connected to database with optimized settings'))
   .catch((err) => console.log(err));
}
module.exports = connectTodb