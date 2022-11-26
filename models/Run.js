var mongoose = require("mongoose");
const Platform = require("./Platform");
const User = require("./User");
const Game = require("./Game");
const Category = require("./Category");

var Schema = mongoose.Schema;

var RunSchema = new Schema({
	game: {
		type: Game.schema,
		default: {},
	},
	category: {
		type: Category.schema,
		default: {},
	},
	time: {
		type: String,
	},
	platform: {
		type: Platform.schema,
		default: {},
	},
	user: {
		type: User.schema,
		default: {},
	},
	placement: {
		type: Number,
	},
	videoLink: {
		type: String,
	}

});

module.exports = mongoose.model("Run", RunSchema);