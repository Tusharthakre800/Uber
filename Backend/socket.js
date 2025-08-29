const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server,{
        cors: {
            origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
            methods: ["GET", "POST"],
            credentials: true
        }
    })
    
    io.on('connection', (socket) => {
        console.log(`client connected ${socket.id}`);

        socket.on('join', async (data) => {
            const {userId, userType} = data;
            console.log(`User ${userId} joined with socketId ${userType}`);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {socketId: socket.id});
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, {socketId: socket.id});
            }
        });

        socket.on('update-location-captain', async (data) => {
            const {userId, location} = data;
            
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', {message: 'Location is required'});
            }

            await captainModel.findByIdAndUpdate(userId, {
                location:{
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`client disconnected ${socket.id}`);
        });
    });
}

const sendMassageToSocketId = (socketId, messageObject) => {
    console.log(`Sending massage to ${socketId} , massage: ${messageObject}`);
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket is not initialized');
    }
}

module.exports = {
    initializeSocket,
    sendMassageToSocketId
}