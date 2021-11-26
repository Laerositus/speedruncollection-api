var mongoose = require("mongoose");
var gameSchema = require("./Game");

var UserSchema = new mongoose.Schema({
    username: String,
	totalRuns: Number,
	favoriteGame: {
		type: mongoose.Schema.ObjectId,
		ref: 'Game',
	},
	creationDate: Date,
	discord: String,
	steam: String,
	twitch: String,
	youtube: String
})

module.exports = mongoose.model("User", UserSchema);