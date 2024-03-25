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
  bufferSize: 4096,
  //precision: "32-bit",
  //sampleEncoding: "32-bit Signed Integer PCM",
  debug: true
});

const micInputStream = micInstance.getAudioStream();

// Handle WebSocket connections
wss.on('connection', function connection(ws) {
  console.log('New client connected');

  // Pipe microphone input stream to WebSocket
  micInputStream.on('data', function(data) {
    setTimeout(() => {
      ws.send(data, { binary: true }, (error) => {
        if (error) console.error('WebSocket send error:', error);
      });
    }, 10); // Introduce a 10ms delay
  });

  // Handle WebSocket disconnections
  ws.on('close', function () {
    console.log('Client disconnected');
  });
});

// Start capturing audio from microphone
micInstance.start();
