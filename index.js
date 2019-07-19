
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const Discord = require('discord.js')
const bot = new Discord.Client()

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
app.use(express.static('public'));
let numUsers = 0;

io.on('connection', (socket) => {
  socket.on('new message', function (data) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  socket.once('add user', (username) => {
    socket.username = username;
    ++numUsers;

    socket.broadcast.emit('login', {
      username: socket.username,
      numUsers
    });
  });
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });
  socket.once('disconnect', function () {

      --numUsers;
      socket.broadcast.emit('disconnect', {
        username: socket.username,
        numUsers
      });
    
  });
});