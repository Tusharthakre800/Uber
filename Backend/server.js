const http = require('http');
const app = require('./app');
const { initializeSocket}  = require("./socket")
const PORT = process.env.PORT || 3000

// Add at the top after imports
const cluster = require('cluster');
const process = require('process');

const server = http.createServer(app);

initializeSocket(server);


// Add after server.listen()
if (process.send) {
  process.send('ready');
}

// Graceful shutdown for PM2
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



