const asyncHandler = require("express-async-handler");
const Post = require("../models/postsModel");
const User = require("../models/userModel");

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
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    const userIds = posts.map((post) => post.userId);

    const users = await User.find({ _id: { $in: userIds } });

    const postOfUser = new Map(users.map((user) => [user._id.toString(), { userId: user._id.toString(), username: user.username, avatar: user.avatar }]));

    const postsOfUserInfo = posts.map(post => ({
      _id: post._id.toString(),
      userId: postOfUser.get(post.userId.toString()) || { id: 'Unknown', username: 'Unknown', avatar: 'default-avatar-url' },
      desc: post.desc,
      img: post.img,
      likes: post.likes,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    if (postsOfUserInfo) {
      return res.status(200).send({
        status: 200,
        message: "success",
        postData: postsOfUserInfo,
      });
    } else {
      return res.status(500).send({
        status: 500,
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const getPostByIdController = asyncHandler(async (req, res) => {
  const userId = req.query['userId'];
  if (!userId) {
    return res.status(401).send({
      status: 401,
      message: "Authentication failed",
    });
  }

  const post = await Post.find({ userId: userId }).sort({ createdAt: -1 });
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
  getPostByIdController
};
