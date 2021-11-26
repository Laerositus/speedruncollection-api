var express = require("express");
const CategoryController = require("../controllers/CategoryController");

var router = express.Router();

router.post("/", CategoryController.categoryStore);
// router.delete("/:id", CategoryController.categoryDelete);

module.exports = router;