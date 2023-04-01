const {	body, validationResult } = require("express-validator");
const {	sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
// const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Game = require("../models/Game");

function GameData(data) {
	this._id = data._id;
	this.name = data.name;
	this.releaseDate = data.releaseDate;
	this.platforms = data.platforms;
	this.totalRuns = data.totalRuns;
	this.playerCount = data.playerCount;
	this.gameRule = data.gameRule;
	this.image = data.image;
	this.categories = data.categories;
}

exports.gameStore = [
	// auth,
	body("name", "Name must not be empty.").isLength({
		min: 1
	}).trim(),
	// sanitizeBody("*").escape(),
	(req, res) => {	
		try {
			const errors = validationResult(req);
			// console.log(req.body);
			var game = new Game({
				name: req.body.name,
				gameRule: req.body.gameRule,
				platforms: req.body.platforms,
				releaseDate: req.body.releaseDate,
				totalRuns: req.body.totalRuns,
				playerCount: req.body.playerCount,
				categories: req.body.categories,
				image: req.body.image 
			});
			
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				//Save game.
				game.save(function (err) {
					if (err) {
						return apiResponse.ErrorResponse(res, err);
					}
					// console.log(game)
					let gameData = new GameData(game);
					return apiResponse.successResponseWithData(res, "Game posted successfully.", gameData);
				});
			}
		} catch (err) {
			console.log(err);
			//Throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.gameList = [
	function (req, res) {
		try {
			Game.find({}, "_id name runs platforms image releaseDate categories totalRuns playerCount gameRule").then((games) => {
				if (games.length > 0){
					return apiResponse.successResponseWithData(res, "Operation Success", games);
				}else {
					return apiResponse.successResponseWithData(res, "Operation Success");
				}
			});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.gameDetail = [
	function (req, res) {
		console.log(req.params.id);
		if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return apiResponse.validationErrorWithData(res, "Invalid Game ID", {});
		}
		try {
			Game.findOne({
				_id: req.params.id
			}).then((game) => {
				if (game !== null) {
					let gameData = new GameData(game);
					return apiResponse.successResponseWithData(res, "Operation success", gameData);
				} else {
					return apiResponse.noContentResponse(res, "Game does not exist with this id");
				}
			});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.gameUpdate = [
	// sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if(req.body.platforms !=[]){
				var game = new Game({
					_id: req.params.id,
					name: req.body.name,
					platforms: req.body.platforms,
					releaseDate: req.body.releaseDate,
					totalRuns: req.body.totalRuns,
					playerCount: req.body.playerCount,
					categories: req.body.categories,
					gameRule: req.body.gameRule,
					image: req.body.image
				});

				console.log(game);
				if (!errors.isEmpty()) {
					return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
				} else {
					if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
						return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
					} else {
						Game.findById(req.params.id, function (err, foundGame) {
							if (foundGame === null) {
								return apiResponse.noContentResponse(res, "Game does not exist with this id");
							} else {							
								//Update game.
								// console.log(game)
								Game.findByIdAndUpdate(req.params.id, game, {}, function (err) {								
									if (err) {
										return apiResponse.ErrorResponse(res, err);
									} else {
										// console.log(game);
										let gameData = new GameData(game);
										return apiResponse.successResponseWithData(res, "Game updated succesfully.", gameData);
									}
								});
							}
						});
					}
				}
			}
		} catch (err) {
			//Throw error in json response with status 500.
			console.log(err);
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.gameDelete = [
	function (req, res) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			Game.findById(req.params.id, function (err, foundGame) {
				if (foundGame === null) {
					return apiResponse.noContentResponse(res, "Game does not exist with this id");
				} else {
					//Check authorized user
					// if (foundGame.user.toString() !== req.user.email) {
					// 	return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
					// } else {
					//Delete game.
					Game.findByIdAndRemove(req.params.id, function (err, game) {
						if (err) {
							return apiResponse.ErrorResponse(res, err);
						} else {
							game.remove();
							return apiResponse.successResponse(res, "Game deleted successfully.");
						}
					});
					// }
				}
			});
		} catch (err) {
			//Throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
