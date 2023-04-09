var mongoose = require("mongoose");
const Platform = require("./Platform.js");
const Run = require("./Run.js");

var Schema = mongoose.Schema;

var GameSchema = new Schema({
	name: {
		type: String
	},
	platforms: [ 
		String
	],
	releaseDate: Date,
	categories: [{
		_id: String,
		name: String,
		categoryRule: String
	}],
	gameRule: String,
	image: String
});

module.exports = mongoose.model("Game", GameSchema);