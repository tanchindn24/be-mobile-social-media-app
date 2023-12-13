const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postsModel");
const {authSchema, loginValidate} = require("../../helpers/validationSchema");
const {hashedPassword, isValidPassword} = require("../../helpers/hashPassword");
const {signAccessToken, signRefreshAccessToken, verifyRefreshToken} = require("../../helpers/jwtHelper");

const CreatePostController = asyncHandler(async (req, res) => {
    const { idUser, post } = req.body.parameters;
    if (!idUser) {
        return res.status(401).send({
            status: 401,
            message: "Authentication failed",
        });
    };
    const postObject = {
        userId: idUser,
        desc: post.description ?? '',
        img: post.image ?? '',
    };
    const postCreate = await Post.create(postObject);
    if (postCreate) {
        return res.status(200).send({
            status: 200,
            message: "success",
            data: postCreate
        });
    } else {
        return res.status(500).send({
            status: 500,
            message: "Internal Server Error"
        });
    }
});

module.exports = {
    CreatePostController
}
