const express = require("express");
const router = express.Router();
const { CreatePostController, GetPostController } = require("../../src/controllers/posts");
const { verifyAccessToken } = require("../../helpers/jwtHelper");

router.post("/create", verifyAccessToken, CreatePostController);
router.get("/get-all", verifyAccessToken, GetPostController)

module.exports = router;
