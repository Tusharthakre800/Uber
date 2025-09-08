
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const app = express();
const connectTodb = require('./db/db');
const userRouters = require('./routes/user.routes');
const captainRouters = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

const dotenv = require('dotenv');

dotenv.config();
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
app.use(compression());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// Backend/app.js - Add these headers before routes
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.get('/',(req,res)=>{
    res.send('hello world');
})

app.use('/users', userRouters);
app.use('/captains', captainRouters);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);

module.exports = app;
