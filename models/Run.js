var mongoose = require("mongoose");
const Platform = require("./Platform");
const User = require("./Player");
const Game = require("./Game");
const Category = require("./Category");

var Schema = mongoose.Schema;

var RunSchema = new Schema({
	game: {
		type: Schema.Types.ObjectId, ref: "Game"
	},
	category: {
		type: Schema.Types.ObjectId, ref: "Category"
	},
	time: String,
	platform: {
		type: Schema.Types.ObjectId, ref: "Platform"
	},
	user: {
		type: Schema.Types.ObjectId, ref: "User",
	},
	placement: Number,
	videoLink: String
});

module.exports = mongoose.model("Run", RunSchema);