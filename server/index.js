const Express = require("express");
const App = Express();
const Morgan = require("morgan");
const Cors = require("cors");
const server = require("http").createServer(App);
const io = require("socket.io")(server);
_SOCKET = null;

App.use(Express.json());
App.use(Morgan("dev"));
App.use(Cors({ origin: "*" }));

App.get("/", (req, res) => {
  res.send({ data: "Hello world" });
});

io.on("connection", (socket) => {
  _SOCKET = socket;
  console.log(`Client connected with socket.id: ${socket.id}`);

  // Send a welcome message to the connected client
  socket.emit("message", `Hello from server! Your socket.id is ${socket.id}`);

  // Listen for messages from the client
  socket.on("clientMessage", (data) => {
    console.log(`Message from ${socket.id}: ${data}`);
  });

  // When client disconnects
  socket.on("disconnect", () => {
    console.log(`Client disconnected with socket.id: ${socket.id}`);
  });
});
server.listen(3001, () => {
  console.log("listening on http://localhost:3001");
});
