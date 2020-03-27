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

    //Welcome message for new user
    socket.emit('message','Welcome to ChitChat!');

    //send message to all client sockets when a user joins the chat
    //broadcast will be send to all users except the new user
    socket.broadcast.emit('message','A user has joined the chat');

    //notify all other users on disconnection
    socket.on('disconnect',() => {
        io.emit('message','A user has left the chat');
    });

    //catch user textMessage
    socket.on('userMessage',msg => {
        io.emit('message',msg);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})