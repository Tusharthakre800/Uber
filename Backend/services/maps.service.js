const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    
    // if(!address) {
    //     throw new Error('Address is required');
    // }
    const apikey = process.env.GOOGLE_MAP_API_KEY;
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;


    try{
    const response = await axios.get(url);
    // console.log(response.data);
    
    if(response.data.status === "OK") {
        const location = response.data.results[0].geometry.location;
        return {
            ltd: location.lat,
            lng: location.lng
        };
    }else {
        throw new Error('Unable to fetch coordinates');
    }
  }catch(error) {
        console.error('Error fetching coordinates:')
        throw(error);
}

}


module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apikey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&units=metric&key=${apikey}`;

    try{
        const response = await axios.get(url);
        if(response.data.status === "OK") {
            if(response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
                throw new Error('No route found');
            }

            const result = response.data.rows[0].elements[0];
            console.log(result);
            
            return {
                ...result,
                distance: {
                    ...result.distance,
                    kilometers: result.distance.value / 1000 // Add kilometers to the response
                }
            };
        
        }else {
            throw new Error('Unable to fetch distance and time');
        }
    }catch(error) {
        console.error('Error fetching distance and time:')
        throw(error);
    }
}
module.exports.getAutoCompletesuggestion = async (input) => {
    if(!input){
        throw new Error('Input is required');
    }
    const apikey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apikey}`;

    try{
        const response = await axios.get(url);
        if(response.data.status === "OK") {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        }else {
            throw new Error('Unable to fetch autocomplete suggestions');
        }
    }catch(error) {
        console.error('Error fetching autocomplete suggestions:')
        throw(error);
    }
}

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {

    const captains = await captainModel.find({
        // radius is in km
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6378.1] // 6378.1 is the radius of the earth in km
            }
        }
    });

    return captains;
}