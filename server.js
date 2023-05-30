const express = require('express');
// const routes = require('./routes');
const db = require('./config/connection');
const cors = require('cors')
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())
const server = require('http').Server(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', socket => {
  socket.on('send-chat-message', (room,message) =>{
    socket.broadcast.emit('chat-message',message)
  })
})
io.on('connection', socket => {
  socket.on('joinRoom', (room, user)=>{
    socket.join(room)
    console.log(user + ' joined ' + room)
  })
  // socket.on('send-chat-message', (room, message) => {
  //   socket.to(room).emit('chat-message', message)
  // })
})


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);

db.once('open', () => {
  server.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});