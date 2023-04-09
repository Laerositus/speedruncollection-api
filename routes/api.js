var express = require("express");
var authRouter = require("./auth");
var runRouter = require("./run");
var streamRouter = require("./stream");
var gameRouter = require("./game");
var platformRouter = require("./platform");
var playerRouter = require("./player");

var app = express();

app.use("/auth/", authRouter);
app.use("/run/", runRouter);
app.use("/stream/", streamRouter);
app.use("/game/", gameRouter);
app.use("/platform/", platformRouter);
app.use("/player/", playerRouter);

module.exports = app;