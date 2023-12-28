const express = require("express");
const router = express.Router();
const { CreatePostController, GetPostController, getPostByIdController } = require("../../src/controllers/posts");
const { verifyAccessToken } = require("../../helpers/jwtHelper");

router.post("/create", verifyAccessToken, CreatePostController);
router.get("/get-all", verifyAccessToken, GetPostController)
router.get("/get-by-id", verifyAccessToken, getPostByIdController)

module.exports = router;
