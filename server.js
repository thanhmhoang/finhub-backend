const express = require('express');
// const allRoutes = require('./controllers');
const cors = require("cors")
// const routes = require('./routes');
const db = require('./config/connection');


const cwd = process.cwd();

const PORT = process.env.PORT || 3001;

const app = express();
const server = require('http').Server(app)

const io = require('socket.io')(server)
// const ioConnection = require('./sockets/ioConnection')


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);

db.once('open', () => {
  server.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});