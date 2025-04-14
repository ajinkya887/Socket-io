function chatHandler(io, socket) {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    socket.username = username;
    console.log(`${username} joined`);
    socket.broadcast.emit("chat message", {
      user: "System",
      text: `${username} joined the chat`,
    });
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", { user: socket.username, text: msg });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("chat message", {
        user: "System",
        text: `${socket.username} left the chat`,
      });
    }
  });
}

module.exports = chatHandler;
