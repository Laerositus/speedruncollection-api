// const {
// 	body,
// 	validationResult
// } = require("express-validator");
// const {
// 	sanitizeBody
// } = require("express-validator");
// const apiResponse = require("../helpers/apiResponse");
// const auth = require("../middlewares/jwt");
// var mongoose = require("mongoose");
// mongoose.set("useFindAndModify", false);

// const Platform = require("../models/platform");

// function PlatformData(data) {
//     // this.id = data._id;
//     this.name = data._name;
//     this.platformRule = data._platformRule;
// }

// exports.platformStore = [
// 	auth,
// 	body("name", "Name must not be empty.").isLength({
// 		min: 1
// 	}).trim(),
//     body("platformRule", "platformRule must not be empty.").isLength({
// 		min: 1
// 	}).trim(),
// 	sanitizeBody("*").escape(),
// 	(req, res) => {			
// 		try {
// 			const errors = validationResult(req);
// 			var platform = new Platform({
// 				name: req.body.name,
// 				platformRule: req.body.platformRule,
// 			});
// 			if (!errors.isEmpty()) {
// 				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
// 			} else {

// 				//Save platform.
// 				platform.save(function (err) {
// 					if (err) {
// 						return apiResponse.ErrorResponse(res, err);
// 					}
// 					let platformData = new PlatformData(platform);
// 					return apiResponse.successResponseWithData(res, "Platform posted successfully.", platformData);
// 				});
// 			}
// 		} catch (err) {
// 			//Throw error in json response with status 500. 
// 			return apiResponse.ErrorResponse(res, err);
// 	    }
//     }
// ];