
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const Discord = require('discord.js')
const bot = new Discord.Client()
const users = []
const admins = ["LeRoiDesKiwis", "jauneattend", "mat"]

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
    numUsers++;
    
    if(admins.)

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
    
      if(!socket.username) return;

      numUsers--;
      socket.broadcast.emit('disconnectUser', {
        username: socket.username,
        numUsers
      });
    
  });
});

function User(username, options){
  
  this.username = username;
  this.options = options;
  
}