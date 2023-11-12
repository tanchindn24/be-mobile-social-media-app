const express = require("express");
const router = express.Router();
const authRoute = require("./Auth.route");
const postRoute = require("./Posts.route");

router.use("/auth",  authRoute);
router.use("/post", postRoute);

module.exports = {
    routes: router,
};
