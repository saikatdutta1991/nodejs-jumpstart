const io = require("../commons/socket-io");

io.on("connection", (socket) => {
  console.log(`Socket client connected ${socket.id}`);
  socket.emit("connected", { message: "Client connected to socket." });
});
