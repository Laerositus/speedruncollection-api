var express = require("express");
const PlatformController = require("../controllers/PlatformController");

var router = express.Router();

router.post("/", PlatformController.platformStore);
router.get("/", PlatformController.platformList);
router.get("/:id", PlatformController.platformDetail);
router.put("/:id", PlatformController.platformUpdate);
router.delete("/:id", PlatformController.platformDelete);

module.exports = router;