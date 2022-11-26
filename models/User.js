var mongoose = require("mongoose");
var Game = require("./Game");

const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	username: String,
	totalRuns: Number,
	creationDate: Date,
	discord: String,
	steam: String,
	twitch: String,
	youtube: String
});

module.exports = UserSchema;
module.exports = mongoose.model("User", UserSchema);