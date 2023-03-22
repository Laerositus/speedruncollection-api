var mongoose = require("mongoose");
var Game = require("./Game");

const Schema = mongoose.Schema;

var PlayerSchema = new mongoose.Schema({
	username: String,
	totalRuns: Number,
	creationDate: Date,
	discord: String,
	steam: String,
	twitch: String,
	youtube: String
});

module.exports = PlayerSchema;
module.exports = mongoose.model("Player", PlayerSchema);