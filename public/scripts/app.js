function User(nickname = '_' + Math.random().toString(36).substr(2, 9)) {
  this.nickname = nickname;
}

const user = new User();

let socket = io();
let m = document.getElementById("m");
let nick = document.getElementById("nick");
let submit = document.getElementById('submit');
let inputLine = document.getElementById('inputLine');
let readout = document.getElementById('messages');


m.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      sendMessage(m.value, user);
    }
});

nick.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      user.nickname = nick.value;
      displaySystemMessage(`Your username is now: ${user.nickname}.`)
      nick.style.display = "none";
    }
});


function sendMessage(msg, user) {
  console.log(msg);
	socket.emit("chat message", msg, user);
  displayMessage(user, msg)
	m.value = "";
	return false;
}

function displayMessage(user, msg) {
  readout.innerHTML += `<li>${user.nickname} said: ${msg}</li>`;
}

function displaySystemMessage(msg) {
  readout.innerHTML += `<li class='system-message'>${msg}`
}

socket.on('connect message', (msg) => {
  displaySystemMessage(msg);
})

socket.on('chat message', (msg, user) => {
  displayMessage(user, msg);
});

socket.on('disconnect message', (user, msg) => {
  displaySystemMessage(user.nickname + " has disconnected");
});