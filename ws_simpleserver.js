const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        let data = JSON.parse(message);
        console.log(`Received message: ${data.text}`);
        data.text = `Echo: ${data.text}`
        ws.send(JSON.stringify(data));
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});