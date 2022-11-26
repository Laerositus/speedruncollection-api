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

const Category = require("../models/Category");

function CategoryData(data) {
    this.id = data._id;
    this.name = data._name;
    this.categoryRule = data._categoryRule;
}

exports.categoryStore = [
	// auth,
	body("name", "Name must not be empty.").isLength({
		min: 1
	}).trim(),
    body("categoryRule", "categoryRule must not be empty.").isLength({
		min: 1
	}).trim(),
	sanitizeBody("*").escape(),
	(req, res) => {			
		try {
			const errors = validationResult(req);
			var category = new Category({
				name: req.body.name,
				categoryRule: req.body.categoryRule,
			});
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				//Save category.
				category.save(function (err) {
					if (err) {
						return apiResponse.ErrorResponse(res, err);
					}
					let categoryData = new CategoryData(category);
					return apiResponse.successResponseWithData(res, "Category posted successfully.", categoryData);
				});
			}
		} catch (err) {
			//Throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
    }
];