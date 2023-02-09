const WebSocket = require('ws');

// Create a WebSocket connection to the server
const socket = new WebSocket('ws://localhost:9000');

// Send a JSON object when the WebSocket is open
socket.onopen = (event) => {
  const data = { message: 'Hello server!' };
  socket.send(JSON.stringify(data));
  console.log('Sent:', data);
};

// Receive a message from the server
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

// Handle errors
socket.onerror = (error) => {
  console.log('Error:', error);
};

