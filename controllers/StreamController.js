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

// const Stream = require("../models/stream");

// function StreamData(data) {
//     // this.id = data._id;
//     this.name = data._name;
//     this.streamRule = data._streamRule;
// }

// exports.streamStore = [
// 	auth,
// 	body("name", "Name must not be empty.").isLength({
// 		min: 1
// 	}).trim(),
//     body("streamRule", "streamRule must not be empty.").isLength({
// 		min: 1
// 	}).trim(),
// 	sanitizeBody("*").escape(),
// 	(req, res) => {			
// 		try {
// 			const errors = validationResult(req);
// 			var stream = new Stream({
// 				name: req.body.name,
// 				streamRule: req.body.streamRule,
// 			});
// 			if (!errors.isEmpty()) {
// 				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
// 			} else {

// 				//Save stream.
// 				stream.save(function (err) {
// 					if (err) {
// 						return apiResponse.ErrorResponse(res, err);
// 					}
// 					let streamData = new StreamData(stream);
// 					return apiResponse.successResponseWithData(res, "Stream posted successfully.", streamData);
// 				});
// 			}
// 		} catch (err) {
// 			//Throw error in json response with status 500. 
// 			return apiResponse.ErrorResponse(res, err);
// 	    }
//     }
// ];