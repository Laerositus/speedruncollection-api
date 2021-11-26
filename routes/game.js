var express = require("express");
const GameController = require("../controllers/GameController");

var router = express.Router();

router.get("/", GameController.gameList);
router.post("/", GameController.gameStore);
router.get("/:id", GameController.gameDetail);
router.put("/:id", GameController.gameUpdate);
router.delete("/:id", GameController.gameDelete);

module.exports = router;