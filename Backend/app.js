const dotenv = require('dotenv');

dotenv.config();



const express = require('express');
const cors = require('cors');



const  app = express();
const connectTodb = require('./db/db');
const userRouters = require('./routes/user.routes');
const captainRouters = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectTodb();

const cookiesParser = require('cookie-parser');

app.use(cookiesParser());

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/',(req,res)=>{
    res.send('hello world');
})

app.use('/users', userRouters);
app.use('/captains', captainRouters);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);



module.exports = app;