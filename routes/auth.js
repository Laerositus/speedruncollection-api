var express = require("express");

const AuthController = require("../controllers/neo4j/AuthController");

var router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// router.delete("/user", AuthController.delete);
// router.put("/password", AuthController.changePassword);

module.exports = router;