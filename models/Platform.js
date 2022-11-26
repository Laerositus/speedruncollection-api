var mongoose = require("mongoose");
const GameSchema = require("./Game");
var Schema = mongoose.Schema;

var PlatformSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	releaseDate: {
		type: Date,
	},
	games: [{
		type: Schema.Types.ObjectId, ref: "Game"
	}]
});

module.exports = mongoose.model("Platform", PlatformSchema);