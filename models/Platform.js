var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const PlatformSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	releaseDate: {
		type: Date,
	}
});

module.exports = mongoose.model("Platform", PlatformSchema);