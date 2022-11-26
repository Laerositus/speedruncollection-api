var mongoose = require("mongoose");
const Category = require("./Category.js");
const Platform = require("./Platform.js");
const Run = require("./Run.js");

var Schema = mongoose.Schema;

var GameSchema = new Schema({
	name: {
		type: String
	},
	platforms: {
		type: [Platform.schema],
	},
	releaseDate: {
		type: Date,
	},
	totalRuns: {
		type: Number,
	},
	playerCount: {
		type: Number,
	},
	categories: {
		type: [Category.schema], 
	},
	gameRule: { 
		type: String,
	},
	runs: {
		type: [Run.schema],
	},
	image: String
});

module.exports = mongoose.model("Game", GameSchema);