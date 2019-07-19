
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
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
      user: socket.user,
      message: data
    });
  });
  
  socket.on('getuser', (name) => {
    let user;
    if(!name) user = socket.user
    else user = users.find(user => user.username === name);
    socket.emit('response', {
      type:"getuser",
      value:user,
    })
    
  })
  
  let connection = (username) => {
    
    if(users.find(user => user.username === username)){
      
      socket.emit('loginResp', {})
      
      console.log(username+"already logged in")
      
      return;
    }
    
    socket.off('add user', connection)
    
    numUsers++;
    
    socket.user = new User(username, {
      admin: admins.includes(username),
    })
    
    users.push(socket.user)
    
    socket.emit('response', {type: 'loginresp', valid: true, name: username})
    
    console.log("login "+username)
    
    socket.broadcast.emit('login', {
      user: socket.user,
      numUsers
    });
  
  socket.on('add user', 
  });
  
  socket.on('typing', function () {
    socket.broadcast.emit('typing', socket.user);
  });
  
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', socket.user);
  });
  
  socket.once('disconnect', function () {
    
      if(!socket.user) return;

      numUsers--;
      socket.broadcast.emit('disconnectUser', {
        user: socket.user,
        numUsers
      });
    
     users.splice(users.indexOf(socket.user), 1 );
     socket.off('typing')
     socket.off('stop typing')
     socket.off('new message')
    
  });
  
});

function User(username, options){
  
  this.username = username;
  this.options = options;
  
}