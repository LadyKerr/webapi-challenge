const express = require("express");

const actionRouter = require("./data/helpers/actionModel.js");
const projectRouter = require("./data/helpers/projectModel");

const server = express();

//middleware
function logger(req, res, next) {
  console.log(`A ${req.method} request was made from ${req.path}`);
  next();
}

//global middlewares
server.use(logger);
server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send(`<h2>I guess it's time for sprinting!</h2>`);
});

module.exports = server;
