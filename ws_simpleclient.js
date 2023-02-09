const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log('Connected to server');
    let data = {
        text: 'Hello, server!'
    }
    ws.send(JSON.stringify(data));
});

ws.on('message', (message) => {
    let data = JSON.parse(message);
    console.log(`Received message: ${data.text}`);
});

ws.on('close', () => {
    console.log('Disconnected from server');
});