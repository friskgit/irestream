const WebSocket = require('ws');
const PORT = 8080; // Replace with your desired port number
const wss = new WebSocket.Server({ port: PORT });

console.log(`WebSocket server is running on port ${PORT}`);

// Handle WebSocket connections
wss.on('connection', function connection(ws) {
  console.log('New client connected');

  // Handle messages from clients
  ws.on('message', function incoming(message) {
    console.log('Received message from client:', message);
    // You can handle the received message here
  });

  // Handle WebSocket disconnections
  ws.on('close', function () {
    console.log('Client disconnected');
  });
});