const express = require("express");
const router = express.Router();
const {CreatePostController} = require("../../src/controllers/posts");
const {verifyAccessToken} = require("../../helpers/jwtHelper");

router.post("/create", verifyAccessToken, CreatePostController);

module.exports = router;
