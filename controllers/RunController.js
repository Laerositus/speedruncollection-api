const {	body, validationResult } = require("express-validator");
const {	sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
// const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Run = require("../models/Run");

function RunData(data) {
	this._id = data._id;
    this.game = data.game;
    this.category = data.category;
	this.platform = data.platform;
	this.time = data.time;
	this.player = data.player;
	this.videoLink = data.videoLink;
}

exports.runStore = [
	// auth,
	// sanitizeBody("*").escape(),
	(req, res) => {	
		try {
			const errors = validationResult(req);
			var run = new Run({
				game: req.body.game,
				category: req.body.category,
				platform: req.body.platform,
				time: req.body.time,
				player: req.body.player,
				videoLink: req.body.videoLink
			});
			
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				// Save run.
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
		try {
			Run
				.find({}, "_id game category time platform player placement videoLink")
				.then((runs) => {
					if(runs.length > 0) {
						return apiResponse.successResponseWithData(res, "Operation success", runs);
					} else {
						return apiResponse.successResponseWithData(res, "Operation success");
					}
				});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
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
			});
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
				_id: req.body._id,
				game: req.body.game,
				category: req.body.category,
				platform: req.body.platform,
				time: req.body.time,
				player: req.body.player,
				videoLink: req.body.videoLink
			});

			console.log(run);

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
];
