var mongoose = require("mongoose");
const User = require("./User");
const Game = require("./Game");
const Category = require("./Category");

var Schema = mongoose.Schema;

var StreamSchema = new Schema({
	user: {
		type: User.schema,
		default: {},
		required: true,
	},
	game: {
		type: Game.schema,
		default: {},
		required: true,
	},
	category: {
		type: Category.schema,
		default: {},
		required: true,
	},
	startTime: {
		type: Date,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
	thumbnail: String
});

module.exports = mongoose.model("Stream", StreamSchema);