const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const cors = require('cors');

const app = express();
const connectTodb = require('./db/db');
const userRouters = require('./routes/user.routes');
const captainRouters = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');


connectTodb();

const cookiesParser = require('cookie-parser');

app.use(cookiesParser());

// Configure CORS to use the environment variable
const corsOptions = {
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};

app.use(cors(corsOptions));
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