var app = require('express')()
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	io.emit('connect message', "a user has connected")
	
	socket.on("chat message", (msg, user) => {
	  console.log(msg);
	  io.emit('chat message', msg, user)
	});
	socket.on('disconnect', (user) => io.emit('disconnect message', user.nickname + ' disconnected'));
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});