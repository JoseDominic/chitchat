const socket = io();

//catch messages to socket and console log

socket.on('message',message => {
    console.log(message);
});

//get users message from chat form

const chatForm = document.getElementById('chat-form');

chatForm.addEventListener('submit', (e) => {
    //prevent the form from submitting to a page
    e.preventDefault();

    //get the user message from the form i/p element msg
    const msg = e.target.elements.msg.value;
    
    //send the user message to server
    socket.emit('userMessage',msg);
});