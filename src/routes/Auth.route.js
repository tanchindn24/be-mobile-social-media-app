const express = require("express");
const router = express.Router();
const {RegisterController, LoginController, Authorization, LogoutController} = require("../../src/controllers/accounts");
const {verifyAccessToken} = require("../../helpers/jwtHelper");

router.post("/sign-up", RegisterController);
router.post("/sign-in", LoginController);
router.get("/authorization", verifyAccessToken, Authorization);
router.get("/logout", LogoutController);

module.exports = router;
