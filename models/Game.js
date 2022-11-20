var mongoose = require("mongoose");
// const categorySchema = require("./Category.js");
// const platformSchema = require("./Platform.js");

var Schema = mongoose.Schema;

var GameSchema = new Schema({
	name: {
		type: String
	},
	platforms: [String],
	releaseDate: {
		type: String,
	},
	totalRuns: {
		type: Number,
	},
	playerCount: {
		type: Number,
	},
	categories: [{name: String, categoryRule: String}], 
	gameRule: { 
		type: String,
	},
	image: String
});

module.exports = mongoose.model("Game", GameSchema);