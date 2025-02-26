const Express = require("express");
const App = Express();
const Morgan = require("morgan");
const Cors = require("cors");
const server = require("http").createServer(App);
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // Allow all origins
  },
});
_SOCKET = null;

App.use(Express.json());
App.use(Morgan("dev"));
App.use(Cors({ origin: "*" }));

App.get("/", (req, res) => {
  _SOCKET.emit("message", req.query.command);
  _SOCKET.on("message", (data) => {
    console.log("🚀 ~ _SOCKET.on ~ data:", data);
    data = Buffer.from(data.toString(), "utf-8").toString("utf-8");
    res.write(data);
    return res.end();
  });
});

io.on("connection", (socket) => {
  _SOCKET = socket;
  console.log(`Client connected with socket.id: ${socket.id}`);

  // Listen for messages from the client
  socket.on("clientMessage", (data) => {
    console.log(`Message from ${socket.id}: ${data}`);
  });

  socket.on("terminal", (data) => {
    console.log("🚀 ~ socket.on ~ data:", data);
    socket.emit("terminalExecute", data);
  });

  socket.on("terminal_process", (data) => {
    socket.emit("terminal_process", data);
  });

  // When client disconnects
  socket.on("disconnect", () => {
    console.log(`Client disconnected with socket.id: ${socket.id}`);
  });
});
server.listen(3001, () => {
  console.log("listening on http://localhost:3001");
});
