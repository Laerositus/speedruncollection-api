var mongoose = require("mongoose");
const Platform = require("./Platform");
const Player = require("./Player");
const Game = require("./Game");

var Schema = mongoose.Schema;

var RunSchema = new Schema({
	game: {
		type: Schema.Types.ObjectId, ref: "Game"
	},
	category: String,
	time: { 
		hours: Number,
		minutes: Number,
		seconds: Number
	},
	platform: {
		type: Schema.Types.ObjectId, ref: "Platform"
	},
	player: {
		type: String, ref: "Player",
	},
	videoLink: String
});

module.exports = mongoose.model("Run", RunSchema);