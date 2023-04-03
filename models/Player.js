var mongoose = require("mongoose");

const Schema = mongoose.Schema;

var PlayerSchema = new mongoose.Schema({
	playername: String,
	totalRuns: Number,
	creationDate: Date,
	discord: String,
	steam: String,
	twitch: String,
	youtube: String
});

module.exports = mongoose.model("Player", PlayerSchema);