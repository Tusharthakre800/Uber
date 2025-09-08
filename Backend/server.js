const http = require('http');
const app = require('./app');
const { initializeSocket } = require("./socket");

// Remove the conflicting process import
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

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



