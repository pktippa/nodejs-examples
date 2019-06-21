var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(7070);

app.use(express.static(__dirname + "/" +  'public'));


io.on('connection', function (socket) {
  socket.on('chat message', function (data) {
    socket.emit('news', { hello: 'world' });
    console.log(data);
  });
});
