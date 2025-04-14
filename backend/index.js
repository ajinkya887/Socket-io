const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const chatHandler = require("./Socket/chatHandler");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  chatHandler(io, socket);
});

server.listen(3000, () => {
  console.log("Server running on port: 3000");
});
