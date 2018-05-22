var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	socket.broadcast.emit('connect message', "a user has connected!");

	socket.on("chat message", (msg, user) => {
	  console.log(msg);
	  socket.broadcast.emit('chat message', msg, user)
	});
	socket.on('disconnect', (user) => io.emit('disconnect message', user.nickname + ' disconnected'));
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});