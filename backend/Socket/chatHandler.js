const Message = require("../models/Message");

function chatHandler(io, socket) {
  console.log("User connected:", socket.id);

  Message.find()
    .sort({ timestamp: 1 })
    .limit(100)
    .then((messages) => {
      socket.emit("chat history", messages);
    });

  socket.on("join", (username) => {
    socket.username = username;
    console.log(`${username} joined`);
    socket.broadcast.emit("chat message", {
      user: "System",
      text: `${username} joined the chat`,
    });
  });

  socket.on("chat message", async (msg) => {
    const messageData = {
      user: socket.username,
      text: msg,
      timestamp: new Date(),
    };
    io.emit("chat message", messageData);

    try {
      const newMessage = new Message(messageData);
      await newMessage.save();
    } catch (err) {
      console.error("Failed to save message:", err.message);
    }
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
