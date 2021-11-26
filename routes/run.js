var express = require("express");
const RunController = require("../controllers/RunController");

var router = express.Router();

router.post("/", RunController.runStore);
router.get("/:id", RunController.runDetail);
router.put("/:id", RunController.runUpdate);
router.delete("/:id", RunController.runDelete);

module.exports = router;