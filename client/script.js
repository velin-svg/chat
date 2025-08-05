const socket = new WebSocket("ws://localhost:3000");

// Generate or get unique ID
function getUserID() {
  let id = localStorage.getItem("userID");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("userID", id);
  }
  return id;
}

const userID = getUserID();

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-button");

socket.onmessage = (event) => {
  const { message, id } = JSON.parse(event.data);
  const div = document.createElement("div");
  div.textContent = `${id === userID ? "You" : "User"}: ${message}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

sendBtn.onclick = () => {
  const message = input.value;
  if (message.trim()) {
    socket.send(JSON.stringify({ message, id: userID }));
    input.value = "";
  }
};
