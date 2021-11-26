const {
	body,
	validationResult
} = require("express-validator");
const {
	sanitizeBody
} = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
// const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Run = require("../models/Run");
const Game = require("../models/Game");

function RunData(data) {
	this._id = data._id;
    this.game = data.game;
    this.category = data.category;
	this.platform = data.platform;
	this.time = data.time;
	this.user = data.user;
	this.placement = data.placement;
	this.videoLink = data.videoLink;
}

exports.runStore = [
	// auth,
	// sanitizeBody("*").escape(),
	(req, res) => {	
		try {
			const errors = validationResult(req);
			console.log(req.body);
			var run = new Run({
				game: req.body.game,
				category: req.body.category,
				platform: req.body.platform,
				time: req.body.time,
				user: req.body.user,
				placement: req.body.placement,
				videoLink: req.body.videoLink
			});
			
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				//Save run.
				run.save(function (err) {
					if (err) {
						return apiResponse.ErrorResponse(res, err);
					}
					// console.log(run)
					let runData = new RunData(run);
					return apiResponse.successResponseWithData(res, "Run posted successfully.", runData);
				});
			}
		} catch (err) {
			console.log(err);
			//Throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
	    }
    }
];

exports.runList = [
	function (req, res) {
		console.log(req.body);
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid Game ID");
		} else {
			Game.findById(req.params.id, function(err, foundGame) {
				if (foundGame === null){
					return apiResponse.noContentResponse(res, "Game does not exist with this id");
				} else {
					try {
						const errors = validationResult(req);							
						Run.find({}, "_id game platform user time placement category videoLink").then((runs) => {
							if (runs.length > 0){
								// console.log(runs);
								return apiResponse.successResponseWithData(res, "Operation Success", runs);
							}else {
								return apiResponse.successResponseWithData(res, "Operation Success");
							}
						});
					} catch (err) {
						return apiResponse.ErrorResponse(res, err);
					}
				}
			})
		}
		
	}
];

exports.runDetail = [
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return apiResponse.validationErrorWithData(res, "Invalid Run ID", {});
		}
		try {
			Run.findOne({
				_id: req.params.id
			}).then((run) => {
				if (run !== null) {
					let runData = new RunData(run);
					return apiResponse.successResponseWithData(res, "Operation success", runData);
				} else {
					return apiResponse.noContentResponse(res, "Run does not exist with this id");
				}
			})
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.runUpdate = [
	// sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var run = new Run({
				_id: req.params.id,
				name: req.body.name,
				platforms: req.body.platforms,
				releaseDate: req.body.releaseDate,
				totalRuns: req.body.totalRuns,
				playerCount: req.body.playerCount,
				categories: req.body.categories,
				runRule: req.body.runRule,
				image: req.body.image
			});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
				} else {
					Run.findById(req.params.id, function (err, foundRun) {
						if (foundRun === null) {
							return apiResponse.noContentResponse(res, "Run does not exist with this id");
						} else {							
							//Update run.
							Run.findByIdAndUpdate(req.params.id, run, {}, function (err) {								
								if (err) {
									return apiResponse.ErrorResponse(res, err);
								} else {
									console.log(run);
									let runData = new RunData(run);
									return apiResponse.successResponseWithData(res, "Run updated succesfully.", runData);
								}
							});				
						}
					});
				}
			}
		} catch (err) {
			//Throw error in json response with status 500.
			console.log(err);
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.runDelete = [
	function (req, res) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			Run.findById(req.params.id, function (err, foundRun) {
				if (foundRun === null) {
					return apiResponse.noContentResponse(res, "Run does not exist with this id");
				} else {
					//Check authorized user
					// if (foundRun.user.toString() !== req.user.email) {
					// 	return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
					// } else {
						//Delete run.
						Run.findByIdAndRemove(req.params.id, function (err, run) {
							if (err) {
								return apiResponse.ErrorResponse(res, err);
							} else {
								run.remove();
								return apiResponse.successResponse(res, "Run deleted successfully.");
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
]
