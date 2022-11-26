var express = require("express");
var authRouter = require("./auth");
var categoryRouter = require("./category");
var runRouter = require("./run");
var streamRouter = require("./stream");
var gameRouter = require("./game");
var platformRouter = require("./platform");

var app = express();

app.use("/auth/", authRouter);
app.use("/category/", categoryRouter);
app.use("/run/", runRouter);
app.use("/stream/", streamRouter);
app.use("/game/", gameRouter);
app.use("/platform/", platformRouter);

module.exports = app;