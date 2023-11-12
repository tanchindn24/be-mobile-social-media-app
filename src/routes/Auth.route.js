const express = require("express");
const router = express.Router();
const {RegisterController, LoginController, Authorization, LogoutController} = require("../../src/controllers/accounts");
const {verifyAccessToken} = require("../../helpers/jwtHelper");

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/authorization", verifyAccessToken, Authorization);
router.get("/logout", LogoutController);

module.exports = router;
