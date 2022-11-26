var express = require("express");
const RunController = require("../controllers/RunController");

var router = express.Router();

router.get('/:id', RunController.runList);
router.get('/', RunController.runsList);

module.exports = router;