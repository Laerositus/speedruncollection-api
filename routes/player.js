var express = require ("express");
const PlayerController = require("../controllers/PlayerController");
var router = express.Router();

router.post("/", PlayerController.playerStore);
router.get("/", PlayerController.playerList);
router.get("/:playername", PlayerController.playerDetail);
router.put("/:playername", PlayerController.playerUpdate);
router.delete("/:playername", PlayerController.playerDelete);

module.exports = router;