users = [] //array storing all the users info

//join a user to a room 
function joinUser(id,username,room){
    const newUser = {id,username,room};
    users.push(newUser);
    return newUser;
}

//Get current user object
function getCurrentUser(id){
    return users.find(user => user.id===id); //return the user with the given id
}

//Remove user from array when user leaves chat
function removeUser(id){
    const index = users.findIndex(user => user.id===id); 
    if(index!=-1){
        return users.splice(index,1)[0]//return deleted user after removing it from users
    }
}

//get users in a room
function getRoomUsers(room){
    return users.filter(user => user.room ===room)
}

module.exports = {
    joinUser,
    getCurrentUser,
    removeUser,
    getRoomUsers
};