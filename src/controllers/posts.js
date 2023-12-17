const asyncHandler = require("express-async-handler");
const Post = require("../models/postsModel");

const CreatePostController = asyncHandler(async (req, res) => {
  const { idUser, post } = req.body.parameters;

  if (!idUser) {
    return res.status(401).send({
      status: 401,
      message: "Authentication failed",
    });
  }

  const postObject = {
    userId: idUser,
    desc: post.description ?? "",
    img: post.image ?? "",
  };

  const postCreate = await Post.create(postObject);
  if (postCreate) {
    return res.status(200).send({
      status: 200,
      message: "success",
      data: postCreate,
    });
  } else {
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

const GetPostController = asyncHandler(async (req, res) => {
  const { idUser } = req.body;
  if (!idUser) {
    return res.status(401).send({
      status: 401,
      message: "Authentication failed",
    });
  }
  const post = await Post.find();
  if (post) {
    return res.status(200).send({
      status: 200,
      message: "success",
      postData: post,
    });
  } else {
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

module.exports = {
  CreatePostController,
  GetPostController,
};
