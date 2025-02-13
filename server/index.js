const Express = require("express");
const App = Express();
const Morgan = require("morgan");
const Cors = require("cors");

App.use(Express.json());
App.use(Morgan("dev"));
App.use(Cors({ origin: "*" }));

App.get("/", (req, res) => {
  res.send({ data: "Hello world" });
});

App.listen(3001, () => {
  console.log("listening on http://localhost:3001");
});
