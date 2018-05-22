function User(nickname = '_' + Math.random().toString(36).substr(2, 9)) {
  this.nickname = nickname;
}

const user = new User();

let socket = io();

// selectors for the form to enter messagese
let input = document.getElementById("input");
let submit = document.getElementById('submit');
let inputLine = document.getElementById('inputLine');

// Readout of mesages
let messages = document.getElementById('messages');

// selectors for the nickname selection form
let nick = document.getElementById("nick");
let nickSubmit = document.getElementById("nick-submit");


input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage(input.value, user);
  }
});

nick.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    selectNickName();
  }
});


nickSubmit.addEventListener("click", (event) => {
  if (event.key === "Enter") {
    selectNickName();
  }
})

function selectNickName() {
  if (nick.value) {
    user.nickname = nick.value;
    displaySystemMessage(`Your username is now: ${user.nickname}.`);
    document.getElementById("nick-form").style.display = "none";
    input.disabled = false;
    submit.disabled = false;
  }
}

function sendMessage(msg, user) {
  console.log(msg);
	socket.emit("chat message", msg, user);
  displayMessage(user, msg)
	input.value = "";
	return false;
}

function displayMessage(user, msg) {
  messages.innerHTML = `<li>${user.nickname} said: ${msg}</li>` + messages.innerHTML;
}

function displaySystemMessage(msg) {
  messages.innerHTML = `<li class='system-message'>${msg}` + messages.innerHTML;
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