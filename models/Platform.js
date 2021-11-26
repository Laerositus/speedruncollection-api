var mongoose = require("mongoose");
const gameSchema = require("./Game");

var Schema = mongoose.Schema;

const PlatformSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    games: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Game'
    }]
});

module.exports = mongoose.model("Platform", PlatformSchema);