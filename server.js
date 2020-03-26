const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express(); //intialize app
const server = http.createServer(app);
const io = socketio(server);

//set public as static folder
app.use(express.static(path.join(__dirname,'public')));

//listen for a web socket connection event and take action
io.on('connection',socket => {
    console.log(`New web socket connection...`);
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})