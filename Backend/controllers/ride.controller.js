const rideService = require('../services/ride.service');
const { body, validationResult } = require("express-validator");
const mapService = require('../services/maps.service');
const { sendMassageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');


module.exports.createRide = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {  userId, pickup, destination, vehicleType  } = req.body;
    try {
        const ride = await rideService.createRide({user : req.user._id , pickup, destination, vehicleType});  
        res.status(201).json(ride)
        

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        
        // console.log(pickupCoordinates);


        const captainsInRadius = await mapService.getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 90000000000000);
        // console.log(captainsInRadius);

        ride.otp = ""

        const rideWithUser = await rideModel.findOne({_id :ride._id}).populate('user');
        // console.log(rideWithUser);

        captainsInRadius.map(captain => {
            // console.log(`captain ${captain} ride ${ride}`); 
            
            
            sendMassageToSocketId(captain.socketId,{
                event: 'new-ride',
                data: rideWithUser
            });        
        });
    

    }catch (error) {
        console.log(error);   
        res.status(500).json({ error: error.message });
    }
}


module.exports.getFare = async (req, res) => {
    const {pickup, destination} = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        
        res.status(200).json(fare);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {rideId} = req.body;

    try {
        const ride = await rideService.confirmRide({rideId , captain : req.captain});

        sendMassageToSocketId(ride.user.socketId,{
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);

    }
    catch (error) {
        console.log(error);
       return res.status(500).json({ error: error.message });

}

}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId, otp} = req.query;

    try {
        const ride = await rideService.startRide({rideId, otp  , captain : req.captain});
        sendMassageToSocketId(ride.user.socketId,{
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId} = req.body;
    

    try {
        const ride = await rideService.endRide({rideId , captain : req.captain});
        sendMassageToSocketId(ride.user.socketId,{
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}