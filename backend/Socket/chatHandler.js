const Message = require("../models/Message");

const rooms = ["General", "PHI", "FLIP", "TRAX", "Zydus"];

function chatHandler(io, socket) {
  console.log("User connected:", socket.id);

  // Handle user joining a room
  socket.on("join", async ({ username, room }) => {
    if (!rooms.includes(room)) {
      socket.emit("error", "Invalid room");
      return;
    }

    socket.username = username;
    socket.room = room;
    socket.join(room);

    console.log(`${username} joined room: ${room}`);

    // Send chat history of this room only
    const messages = await Message.find({ room }).sort({ timestamp: 1 });
    socket.emit("chat history", messages);

    socket.to(room).emit("chat message", {
      user: "System",
      text: `${username} joined the chat`,
    });
  });

  // Handle sending messages
  socket.on("chat message", async (text, room) => {
    const messageData = {
      user: socket.username,
      text,
      room: socket.room,
      timestamp: new Date(),
    };

    io.to(socket.room).emit("chat message", messageData);
    try {
      const newMessage = new Message(messageData);
      await newMessage.save();
    } catch (err) {
      console.error("Failed to save message:", err.message);
    }
  });

  // Typing indicator
  socket.on("typing", () => {
    socket.to(socket.room).emit("typing", socket.username);
  });

  socket.on("stop typing", () => {
    socket.to(socket.room).emit("stop typing", socket.username);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    if (socket.username && socket.room) {
      socket.to(socket.room).emit("chat message", {
        user: "System",
        text: `${socket.username} left the chat`,
      });
    }
  });
}

module.exports = chatHandler;
