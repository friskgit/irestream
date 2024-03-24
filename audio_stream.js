const WebSocket = require('ws');
const mic = require('mic');

const PORT = 8080; // Port for WebSocket server

// Create a WebSocket server
const wss = new WebSocket.Server({ port: PORT });

console.log(`WebSocket server is running on port ${PORT}`);

// Configure microphone settings
const micInstance = mic({
  rate: '16000',
  channels: '1',
  debug: true,
});

const micInputStream = micInstance.getAudioStream();

// Handle WebSocket connections
wss.on('connection', function connection(ws) {
  console.log('New client connected');

  // Pipe microphone input stream to WebSocket
  micInputStream.on('data', function(data) {
    ws.send(data, { binary: true }, (error) => {
      if (error) console.error('WebSocket send error:', error);
    });
  });

  // Handle WebSocket disconnections
  ws.on('close', function () {
    console.log('Client disconnected');
  });
});

// Start capturing audio from microphone
micInstance.start();
