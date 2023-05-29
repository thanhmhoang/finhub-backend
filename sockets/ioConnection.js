const io = require('socket.io')(3001)

function connection (){
    io.on('connection', socket => {
        socket.emit('chat-message', 'hello world')
    })
}

module.exports = connection;