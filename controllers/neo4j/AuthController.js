// const UserModel = require("../../models/User");
const User = require("../../models/neo4j/User");
const neo4j = require("../../middlewares/neo4japi");
const {	body, validationResult } = require("express-validator");
const {	sanitizeBody} = require("express-validator");

//helper file to prepare responses.
const apiResponse = require("../../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * User registration.
 *
 * @param {string}      username
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.register = [
	//Validating username
	body("username").isLength({
		min: 1
	}).trim().withMessage("Username must be specified.")
		.custom((value) => {
			return neo4j.searchUserByUsername(value).then((user) => {
				if (user) {
					return Promise.reject("Username already in use");
				}
			});
		}),

	//Validating password
	body("password").isLength({
		min: 1
	}).trim().withMessage("Password must be 6 characters or greater."),

	// Sanitize fields.
	sanitizeBody("password").escape(),

	// Process request after validation and sanitization.
	(req, res) => {
		try {
			console.log(req.body);

			// Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				//hash input password
				bcrypt.hash(req.body.password, 10, function (err, hash) {
					// Create User object with escaped and trimmed data
					var user = new User(req.body.username, hash);

					neo4j.addUser(user).then((user) => {
						user = user.properties;
						let userData = {
							username: user.username,
							password: hash
						};
						// console.log(user);
						return apiResponse.successResponseWithData(res, "Registration Success.", userData);
					}).catch((err) => {
						if (err) {
							console.log(err);
							return apiResponse.ErrorResponse(res, err);
						}
					});
				});
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * User login.
 *
 * @param {string}      username
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.login = [
	body("username").isLength({
		min: 1
	}),
	body("password").isLength({
		min: 1
	}).trim().withMessage("Password must be specified."),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				neo4j.searchUserByUsername(req.body.username).then(user => {
					if (user) {

						//Compare given password with db's hash.
						bcrypt.compare(req.body.password, user.password, function (err, same) {
							if (same) {
								
								let userData = {
										username: user.username
								};
								//Prepare JWT token for authentication
								const jwtPayload = userData;
								const jwtData = {
									expiresIn: process.env.JWT_TIMEOUT_DURATION,
								};
								const secret = process.env.JWT_SECRET;
								//Generated JWT token with Payload and secret.
								userData.token = jwt.sign(jwtPayload, secret, jwtData);
								return apiResponse.successResponseWithData(res, "Login Success.", userData);
									
							} else {
								return apiResponse.unauthorizedResponse(res, "Username or Password wrong.");
							}
						});
					} else {
						return apiResponse.unauthorizedResponse(res, "Username or Password wrong.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * User Delete
 * 
 * @param {string}      username
 * @param {string}      password
 */

exports.delete = [
	body("username").isLength({
		min: 1
	}),
	body("password").isLength({
		min: 1
	}).trim().withMessage("Password must be specified."),
	sanitizeBody("username").escape(),
	sanitizeBody("password").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error", errors.array());
			} else {
				neo4j.searchUserByUsername(req.body.username).then(user => {
					if(user){
						bcrypt.compare(req.body.password, user.password, function(err, same) {
							if (same){
								neo4j.deleteUser(user);
							}
						});
					} else {
						return apiResponse.unauthorizedResponse(res, "Username or Password wrong.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

// /**
//  * Change password
//  *
//  * @param {string}      email
//  * @param {string}      password
//  * @param {string}		newPassword
//  *
//  * @returns {Object}
//  */
// exports.changePassword = [
// 	body("email").isLength({
// 		min: 1
// 	}).trim().withMessage("Email must be specified.")
// 		.isEmail().withMessage("Email must be a valid email address."),
// 	body("password").isLength({
// 		min: 1
// 	}).trim().withMessage("Password must be specified."),
// 	body("newPassword").isLength({
// 		min: 1
// 	}).trim().withMessage("New password must be specified."),
// 	sanitizeBody("email").escape(),
// 	sanitizeBody("password").escape(),
// 	sanitizeBody("newPassword").escape(),

// 	(req, res) => {
// 		try {
// 			const errors = validationResult(req);
// 			if (!errors.isEmpty()) {
// 				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
// 			} else {
// 				neo4j.searchUserByEmail(req.body.email).then(user => {
// 					if (user) {
// 						//Compare given password with db's hash.
// 						bcrypt.compare(req.body.password, user.password, function (err, same) {
// 							if (same) {
// 								//Check account confirmation.
// 								if (user.isConfirmed) {
// 									// Check if User's account is active or not.
// 									if (user.status) {
// 										let userData = {
// 											//_id: user._id,
// 											firstName: user.firstName,
// 											lastName: user.lastName,
// 											email: user.email,
// 										};
// 										bcrypt.hash(req.body.newPassword, 10, function (err, hash) {

// 											neo4j.changePassword(user, hash).then(() => {
// 												return apiResponse.successResponseWithData(res, "Password change successful", userData);
// 											}).catch(() => {
// 												return apiResponse.ErrorResponse(res, "Fucking crash lol");
// 											});
// 										});
// 									} else {
// 										return apiResponse.unauthorizedResponse(res, "Account is not active. Please contact admin.");
// 									}
// 								} else {
// 									return apiResponse.unauthorizedResponse(res, "Account is not confirmed. Please confirm your account.");
// 								}
// 							} else {
// 								return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
// 							}
// 						});
// 					} else {
// 						return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
// 					}
// 				});
// 			}
// 		} catch (err) {
// 			return apiResponse.ErrorResponse(res, err);
// 		}
// 	}
// ];