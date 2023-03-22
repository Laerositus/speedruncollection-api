const {	body, validationResult } = require("express-validator");
const {	sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
// const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Platform = require("../models/Platform");

function PlatformData(data) {
    this._id = data._id;
    this.name = data.name;
    this.releaseDate = data.releaseDate;
    this.games = data.games;
}

exports.platformStore = [
	// auth,
	body("name", "Name must not be empty.").isLength({
		min: 1
	}).trim(),
	sanitizeBody("*").escape(),
	(req, res) => {			
		try {
			const errors = validationResult(req);
			var platform = new Platform({
				name: req.body.name,
                releaseDate: req.body.releaseDate,
			});
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				//Save platform.
				platform.save(function (err) {
					if (err) {
						return apiResponse.ErrorResponse(res, err);
					}
					let platformData = new PlatformData(platform);
					return apiResponse.successResponseWithData(res, "Platform posted successfully.", platformData);
				});
			}
		} catch (err) {
			//Throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.platformList = [
    // auth
    function (req, res)  {
		try {
			Platform.find({}, "_id name releaseDate games").then((games) => {
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

exports.platformDetail = [
    function (req, res) {
		console.log(req.params.id);
		if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return apiResponse.validationErrorWithData(res, "Invalid Platform ID", {});
		}
		try {
			Platform.findOne({
				_id: req.params.id
			}).then((platform) => {
				if (platform !== null) {
					let platformData = new PlatformData(platform);
					return apiResponse.successResponseWithData(res, "Operation success", platformData);
				} else {
					return apiResponse.noContentResponse(res, "Platform does not exist with this id");
				}
			});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.platformUpdate = [
	// sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if(req.body.platforms !=[]){
				var platform = new Platform({
                    _id: req.params.id,
                    name: req.body.name,
                    releaseDate: req.body.releaseDate,
                    games: req.body.games
				});

				if (!errors.isEmpty()) {
					return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
				} else {
					if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
						return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
					} else {
						Platform.findById(req.params.id, function (err, foundPlatform) {
							if (foundPlatform === null) {
								return apiResponse.noContentResponse(res, "Platform does not exist with this id");
							} else {							
								//Update platform.
								Platform.findByIdAndUpdate(req.params.id, platform, {}, function (err) {								
									if (err) {
										return apiResponse.ErrorResponse(res, err);
									} else {
										// console.log(platform);
										let platformData = new PlatformData(platform);
										return apiResponse.successResponseWithData(res, "platform updated succesfully.", platformData);
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

exports.platformDelete = [
    function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
            Platform.findById(req.params.id, function (err, foundPlatform) {
                if (foundPlatform === null) {
					return apiResponse.noContentResponse(res, "Platform does not exist with this id");
				} else {
                    //Check authorized user
					// if (foundPlatform.user.toString() !== req.user.email) {
					// 	return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
					// } else {
					//Delete platform.
					Platform.findByIdAndRemove(req.params.id, function (err, platform) {
						if (err) {
							return apiResponse.ErrorResponse(res, err);
						} else {
							platform.remove();
							return apiResponse.successResponse(res, "Platform deleted successfully.");
						}
					});
            } 
        });
    } catch (err) {
            //Throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        } 
    }
];