const app = require('express');
const { get } = require('https');
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: ['http://localhost:3000']
    }
})
 
const users = {};
const nameColorPair ={}
let w, x, y, z;
z = Object.values(users);
 
io.on('connection', socket => {
    socket.on('username', name => { 
        users[socket.id] = name;
        io.to(socket.id).emit('my-id', socket.id)
        x = Math.floor((Math.random() * 5) + 1)
        nameColorPair[socket.id] = x
        z = Object.values(users);
        io.emit('in-chat', z) 
    }) 

    socket.on('msgSent', ({name, msg, myId}) => {
        y = nameColorPair[myId] 
        w = myId
        io.emit('message', {name, msg, y, w})
        z = Object.values(users);
        io.emit('in-chat', z) 
    })
})

http.listen(4000, function(){
    console.log('listening on port 4000')
    console.log(users)
})  