//this is the module for wrapping up a message into an object before sending it

const moment = require('moment');//module for getting time
function formatMessage(user,text) {
    return {
        user,
        text,
        time:moment().format('h:mm a')
    }
}

module.exports = formatMessage;