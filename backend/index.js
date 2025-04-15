const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const chatHandler = require("./Socket/chatHandler");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const downloadChats = require("./Routes/DownloadRoutes");

dotenv.config();
connectDB();

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

app.use("/download-chats", downloadChats);

server.listen(3000, () => {
  console.log("Server running on port: 3000");
});
