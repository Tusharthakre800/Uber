const  mapService = require('../services/maps.service');
const { validationResult , query} = require("express-validator")




module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {address} = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address); 
        // console.log(coordinates);    
        res.status(200).json(coordinates);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "coordinates not found" });
    }
}

module.exports.getDistanceTime = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { origin, destination } = req.query;
        const distanceAndTime = await mapService.getDistanceTime(origin, destination);
        // console.log(distanceAndTime);
        
        res.status(200).json(distanceAndTime);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "internal server error" });
    }
}

module.exports.getAutoCompletesuggestion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {input} = req.query;
        const suggestions = await mapService.getAutoCompletesuggestion(input);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" });
    }       
}