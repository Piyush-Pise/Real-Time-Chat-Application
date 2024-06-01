require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const router = require("./routes/router");
const AuthenticationRoute = require("./authentication/Authentication");
const jwt = require("jsonwebtoken");
const { AuthDB } = require("./database/models");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use("/api", AuthenticationRoute);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

////////// Authentication //////////

io.use((socket, next) => {
  // console.log('socket.io auth middleware ran');
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authentication error"));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error"));
    }
    socket.user = decoded.user;
    // console.log("socket.user:",decoded.user);
    next();
  });
});

//////////////////////////////////

let connections = [];
// let connectionsSockets = [];

const commonRoom = "Common Room";

io.on("connection", async (socket) => {
  console.log(`User connected: ${socket.id}`);

  const userData = await AuthDB.findById(socket.user.id);

  connections.push({
    socketId: socket.id,
    userId: socket.user.id,
    name: userData.name,
  });
  // connectionsSockets.push(socket);

  console.log("No of connection", connections.length);
  // console.log(socket.rooms);
  socket.join(commonRoom);

  io.to(commonRoom).emit("online users", connections);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    connections = connections.filter((obj) => obj.socketId !== socket.id);
    // connectionsSockets = connectionsSockets.filter(
    //   (obj) => obj.id !== socket.id
    // );

    console.log("No of connection", connections.length);
    socket.leave(commonRoom);
    io.to(commonRoom).emit("online users", connections);
  });

  // socket.on("create room", (data) => {
  //   const theirId = data.otherPartiesSocketId;
  //   const roomId = uuidv4();
  //   socket.join(roomId);
  //   connectionsSockets.forEach((Socket) => {
  //     if (Socket.id === theirId) {
  //       Socket.join(roomId);
  //     }
  //   });
  //   io.to(roomId).emit("room created", roomId);
  // });

  socket.on("message form socket", (data) => {
    const toSocketId = data.toSocketId;
    // console.log("message form socket", data);
    io.to(toSocketId).emit("message from server", data);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
