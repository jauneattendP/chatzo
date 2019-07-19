
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
  let addedUser = false;
  socket.on('new message', function (data) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  socket.on('add user', (username) => {
    if (addedUser) return;
    socket.username = username;
    ++numUsers;
    addedUser = true;

    socket.broadcast.emit('login', {
      username: socket.username,
      numUsers: numUsers
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
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;
      socket.broadcast.emit('disconnect', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});