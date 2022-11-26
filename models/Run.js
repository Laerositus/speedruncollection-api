var mongoose = require("mongoose");
const Platform = require("./Platform");
const User = require("./User");
const Game = require("./Game");
const Category = require("./Category");

var Schema = mongoose.Schema;

var RunSchema = new Schema({
	game: {
		type: Schema.Types.ObjectId, ref: "Game"
	},
	category: Category.schema,
	time: String,
	platform: {
		type: Platform.schema
	},
	user: {
		type: Schema.Types.ObjectId, ref: "User",
	},
	placement: Number,
	videoLink: String
});

module.exports = mongoose.model("Run", RunSchema);