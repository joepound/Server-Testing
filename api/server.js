const express = require("express");

const rootRoute = require("../routes/rootRoute");
const errorRoute = require("../routes/errorRoute");

const server = express();

server.use(express.json());

server.use("/", rootRoute);
server.use(errorRoute);

module.exports = server;
