const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');
const cors = require('cors')
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(routes);
app.use(cors())
const server = require('http').Server(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001"
  }
});
const rooms = {
  room1: {
    name: "room1",
    users: [],
    msg:[]
    
  },
  room2:{
    name: "room2",
    users: [],
    msg:[]
    
  },
 room3:{
    name: "room3",
    users: [],
    msg:[]
    
  }
}

// io.on('connection', socket => {
//   socket.on('send-chat-message', (room,message) =>{
//     socket.broadcast.emit('chat-message',message)
//   })
// })
io.on('connection', socket => {
  socket.on('joinRoom', (room, user)=>{
    socket.join('room1')
    rooms[room].users.push({socket:socket, username:user})
    io.in('room1').emit('joined-room', `${user} joined the room`)
    io.in('room1').emit('update-message-history', rooms[room].msg)
    console.log(socket.id)
    
  })
  socket.on('send-chat-message', (room, message,user) => {
    // socket.join(room)
    // console.log(io.sockets.adapter.rooms)
    console.log('room', room)
    console.log(socket.id)
    console.log(socket.rooms)

    io.in('room1').emit('chat-message', {message:message, sender:user})
    rooms[room].msg.push({message:message, sender:user})
    console.log(rooms[room].msg)
  })

  // socket.on('disconnect', () => {
  //   for (const key in rooms){
  //     const users = rooms[key].users
  //     for (let i = 0; i < users.length; i++) {
  //       const user = users[i];
  //       if(user == socket){
  //         socket.leave(key)
  //         users = users.filter((user)=>{
  //           user != socket 
  //         })
  //       }
        
  //     }
  //   }
  //   socket.rooms === {}
  // });
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once('open', () => {
  server.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});