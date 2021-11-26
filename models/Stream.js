var mongoose = require("mongoose");
const userSchema = require("./User");
const gameSchema = require("./Game");
const categorySchema = require("./Category");

var Schema = mongoose.Schema;

var StreamSchema = new Schema({
    user: {
        type: userSchema,
        required: true,
    },
    game: {
        type: gameSchema,
        required: true,
    },
    category: {
        type: categorySchema,
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