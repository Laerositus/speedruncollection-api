var mongoose = require("mongoose");
const Category = require("./Category.js");
const Platform = require("./Platform.js");
const Run = require("./Run.js");

var Schema = mongoose.Schema;

var GameSchema = new Schema({
	name: {
		type: String
	},
	platforms: [ {
		type: Platform.schema
	}],
	releaseDate: Date,
	totalRuns: Number,
	playerCount: Number,
	categories: [{
		type: Category.schema
	}],
	gameRule: String,
	image: String
});

module.exports = mongoose.model("Game", GameSchema);