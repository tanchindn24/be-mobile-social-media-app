const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postsModel");
const {authSchema, loginValidate} = require("../../helpers/validationSchema");
const {hashedPassword, isValidPassword} = require("../../helpers/hashPassword");
const {signAccessToken, signRefreshAccessToken, verifyRefreshToken} = require("../../helpers/jwtHelper");

const CreatePostController = asyncHandler(async (req, res) => {
    const {userId, desc, img} = req.body;
    const user = req.user;
    const post = await Post.create({
        userId,
        desc,
        img
    });
    if (post) {
        res.status(200).json({
            message: "Create post success",
            data: post
        });
    } else {
        res.status(400);
        throw new Error("Invalid post data");
    }
});

module.exports = {
    CreatePostController
}
