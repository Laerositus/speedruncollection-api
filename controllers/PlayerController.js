const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse")
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Player = require("../models/Player");
const Game = require("../models/Game");
const { gameDelete } = require("./GameController");

function PlayerData(data) {
    this._id = data._id;
    this.username = data.username;
    this.totalRuns = data.totalRuns;
    this.creationDate = data.creationDate;
    this.discord = data.discord;
    this.steam = data.steam;
    this.twitch = data.twitch;
    this.youtubue = data.youtube;
}

exports.playerStore = [
    body("username", "Username must not be empty").isLength({
        min: 1
    }).trim(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            var player = new Player({
                username: req.body.username,
                totalRuns: req.body.totalRuns,
                creationDate: req.body.creationDate,
                discord: req.body.discord,
                steam: req.body.steam,
                twitch: req.body.twitch,
                youtube: req.body.youtube
            });

            if (!errors.isEmpty()){
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {
                player.save(function (err) {
                    if (err) {
                        return apiResponse(res, err);
                    }
                    let playerData = new PlayerData(player);
                    return apiResponse.successResponseWithData(res, "Player posted succesfully", playerData);
                });
            }
        } catch (err) {
            console.log(err);
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.playerList = [
    function (req, res) {
        try {
            Player.find({}, "_id username totalRuns creationDate discord steam twitch youtube").then((players) => {
                if (players.length > 0){
                    return apiResponse.successResponseWithData(res, "Operation Success", players);
                } else {
                    returnapiResponse.successResponseWithData(res, "Operation Success");
                }
            });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.playerDetail = [
    function (req, res) {
        console.log(req.params.id);
        if(!mongoose.Types.ObjectId.isValdid(req.params.id)){
            return apiResponse.validationErrorWithData(res, "Invalid Player ID", {});
        }
        try {
            Player.findOne({
                _id: req.params.id
            }).then((player) => {
                if (player !== null) {
                    let playerData = new PlayerData(player);
                    return apiResponse.successResponseWithData(res, "Operation success", playerData);
                } else {
                    return apiResponse.noContentResponse(res, "Player does not exist with this id");
                }
            });
        } catch (err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.playerUpdate = [
    (req, res) => {
        try {
            const errors = validationResult(req);
            if(req.body.platforms !=[]){
                var player = new Player({
                    _id: req.params.id,
                    username: req.body.username,
                    totalRuns: req.body.totalRuns,
                    creationDate: req.body.creationDate,
                    discord: req.body.discord,
                    steam: req.body.steam,
                    twitch: req.body.twitch,
                    youtube: req.body.youtube
                });

                console.log(game);
                if (!errors.isEmpty()) {
                    return apiResponse.validationResultWithData(res, "Validation Error.", errors.array());
                } else {
                    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                        return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
                    } else {
                        Player.findById(req.params.id, function(err, foundPlayer) {
                            if( foundPlayer === null) {
                                return apiResponse.noContentResponse(res, "Game does not exist with this id");
                            } else {
                                Player.findByIdAndUpdate(req.params.id, game, {}, function (err) {
                                    if (err) {
                                        return apiResponse.ErrorResponse(res, err);
                                    } else {
                                        let playerData = new PlayerData(player);
                                        return apiResponse.successResponseWithData(res, "Game updated succesfully.", gameData);
                                    }
                                });
                            }
                        });
                    }
                }
            }
        } catch (err) {
            console.log(err);
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.playerDelete = [
    function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
        }
        try {
            Player.findById(req.params.id, function (err, foundPlayer) {
                if (foundPlayer === null) {
                    return apiResponse.noContentResponse(res, "Player does not exist with this id");
                } else {
                    Player.findByIdndRemove(req.params.id, function (err, player) {
                        if (err) {
                            return apiResponse.ErrorResponse(res,err);
                        } else {
                            player.remove();
                            return apiResponse.successResponse(res, "Player deleted successfully");
                        }                    
                    });
                }
            });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
