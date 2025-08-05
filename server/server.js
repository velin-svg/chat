const WebSocket = require("ws");
const server = new WebSocket.Server({ port: process.env.PORT || 3000 });

let clients = [];

server.on("connection", (ws) => {
  clients.push(ws);

  ws.on("message", (data) => {
    // Broadcast to all
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  });

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
  });
});

console.log("WebSocket server running...");
