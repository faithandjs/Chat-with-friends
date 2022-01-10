const app = require('express');
const { get } = require('https');
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: ['http://localhost:3000']
    }
})
 
const users = {};
const savedChat = [{}];
let sender, recievedMessage

io.on('connection', socket => {
    socket.on('username', name => { 
        users[name] = socket.id;
        console.log(users)
    })

    //io.emit('settingChat', chat)

/*
    socket.on('friend', ({friend, name })=> {
            if(users[friend] !== undefined){
                io.to(users[name]).emit('foundFriend', {friend, name})
            }else {
                io.to(users[name]).emit('errMsg', `${friend} not found`)
            } 
    })
*/

    socket.on('msgSent', ({name, msg}) => {
        console.log(name, msg)
        io.emit('message', {name, msg})
    })
})

http.listen(4000, function(){
    console.log('listening on port 4000')
    console.log(users)
})  