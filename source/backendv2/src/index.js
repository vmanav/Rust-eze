const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { executeRustCode } = require('./compiler');

const PORT = process.env.PORT || 8000;
const app = express();

app.get('/', (request, response) => {
    response.send('Rust-eze')
})

const server = http.createServer(app);

const socketServer = new WebSocket.Server({ server, path: '/execute' });

socketServer.on('connection', (socket, req) => {
    socket.on('message', async (message) => {
        try {
            const data = JSON.parse(message.toString());
            const code = data.code;
            if (code) {
                await executeRustCode(code, socket);
            } else {
            }
        } catch (err) {
            socket.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }));
        }
    });

    socket.on('close', () => { /* optional cleanup */ });
    socket.on('error', () => { /* handle */ });
});


server.listen(PORT, () => {

});
