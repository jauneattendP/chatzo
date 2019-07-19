
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
app.use(express.static('public'));
let numUsers = 0;

io.on('connection', (socket) => {
  socket.broadcast.emit('login', {username: socket.username, numUsers})
  socket.once('add user', (username) => {
    socket.username = username;
    ++numUsers;

    socket.broadcast.emit('login', {
      username: socket.username,
      numUsers: numUsers
    });
  });
  });
  io.on('typing', (username) => {
    io.broadcast.emit('typing', {
      username: username
    });
  });
  io.on('stop typing', (username)  => {
    io.broadcast.emit('stop typing', {
      username: username
    });
  });
  io.on('disconnect', (username)  => {
      --numUsers;
      io.broadcast.emit('disconnect', {
        username: username,
        numUsers: numUsers
      });
  });
  io.on('new message', (data) => {
    io.broadcast.emit('new message', {
      username: data.username,
      message: data
    });
  })
    