var express = require ("express");
const PlayerController = require("../controllers/PlayerController");
var router = express.Router();

router.post("/", PlayerController.playerStore);
router.get("/", PlayerController.playerList);
router.get("/:id", PlayerController.playerDetail);
router.put("/:id", PlayerController.playerUpdate);
router.delete("/:id", PlayerController.playerDelete);

module.exports = router;