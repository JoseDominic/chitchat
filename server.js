const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {joinUser, getCurrentUser,getRoomUsers,removeUser} = require('./utils/users');

const app = express(); //intialize app
const server = http.createServer(app);
const io = socketio(server);

//set public as static folder
app.use(express.static(path.join(__dirname,'public')));

const botName = 'botDexter'

//listen for a web socket connection event and take action
io.on('connection',socket => {
    console.log(`New web socket connection...`);

    //listen for joinroom event
    socket.on('joinRoom',({username,room}) => {

        const user = joinUser(socket.id,username,room); //add user to array users in users.js
        console.log(user);

        socket.join(user.room);//builtin method of socket for rooms
        //send room name and room users to client to update ui
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        });

        //Welcome message for new user
        socket.emit('message',formatMessage(botName,'Welcome to ChitChat!'));

        //send message to all client sockets when a user joins the chat
        //broadcast will be send to all users except the new user
        socket.broadcast.to(room).emit('message',formatMessage(botName,`${user.username} has joined the chat`));

    });

   
    //catch user textMessage
    socket.on('userMessage',msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(`${user.username}`,msg));
    });

     
    //user disconnects from chat
    socket.on('disconnect',() => {
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('roomUsers',{
                room:user.room,
                users:getRoomUsers(user.room)
            });
            
            io.to(user.room).emit('message',formatMessage(botName,`${user.username} has left the chat`));
        }
    });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})