require("app-module-path").addPath(__dirname);
const express = require("express");
const server = express();


// General middlewares that use in most of apps
const general_middlewares = require("startup/general middlewares.js");
general_middlewares(server, express);

// Routes
const routes = require("src/index.js");
server.use(routes);

// Connecting to Database
const database = require("startup/database.js");
database;


server.listen(7000);
