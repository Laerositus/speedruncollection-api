var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RunSchema = new Schema({
    game: {
        _id: String,
        name: String
    },
    category: {
        name: String
    },
    time: {
        type: String,
    },
    platform: String,
    user: {
        username: String
    },
    placement: {
        type: Number,
    },
    videoLink: {
        type: String,
    }

});

module.exports = mongoose.model("Run", RunSchema);