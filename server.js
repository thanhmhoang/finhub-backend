const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');
const cors = require('cors')
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(routes);

const server = require('http').Server(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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

io.on('connection', socket => {
  const roomName = []
  for(const key in rooms){
    roomName.push(rooms[key].name)
  }
  socket.emit('populate-rooms',roomName)
  socket.on('joinRoom', (room, user)=>{
    socket.leaveAll()
    socket.join(room)
    console.log(room)
    rooms[room].users.push({socket:socket, username:user})
    io.in(room).emit('update-message-history', rooms[room].msg)
  })
  socket.on('send-chat-message', (room, message,user) => {
    rooms[room].msg.push({message:message, sender:user})
    io.in(room).emit('chat-message', {message:message, sender:user})
    // io.in('room1').emit('chat-message', rooms[room].msg)
    console.log(rooms[room].msg)
  })
  
  socket.on('create-new-room', (roomName)=>{
    rooms[roomName] = {name: roomName, users:[], msg:[]}
    io.emit('update-room-list',roomName)
    console.log(rooms)
  })

  socket.on('disconnect', () => {
    for (const key in rooms){
      const users = rooms[key].users
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if(user == socket){
          socket.leave(key)
          users = users.filter((user)=>{
            user != socket 
          })
        }
        
      }
    }
    socket.rooms === {}
  });
})

db.once('open', () => {
  server.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});