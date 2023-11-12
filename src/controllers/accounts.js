const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const {authSchema, loginValidate} = require("../../helpers/validationSchema");
const {hashedPassword, isValidPassword} = require("../../helpers/hashPassword");
const {signAccessToken, signRefreshAccessToken, verifyRefreshToken} = require("../../helpers/jwtHelper");

const RegisterController = asyncHandler(async (req, res) => {
    const {username, email, password} = await authSchema.validateAsync(req.body);
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }
    // hash password
    const hashPassword = hashedPassword(password);
    console.log('hashPassword: ', hashPassword);

    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });

    if (user) {
        const accessToken = await signAccessToken(user._id.toString(), "1h");
        const refreshToken = await signRefreshAccessToken(user._id.toString());
        res.send({
            userData: user,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.status(200).json({
        message: "Register success"
    });
});

const LoginController = asyncHandler(async (req, res) => {
    const {email, password} = await loginValidate.validateAsync(req.body);
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const user = await User.findOne({"email": email});
    if (!user) {
        console.log('user = false');
        res.status(400);
        throw new Error("User not found");
    }
    const checkPassword = isValidPassword(password, user.password);

    if (checkPassword) {
        console.log('checkPassword = true');
    } else {
        res.status(400);
        throw new Error("Invalid password");
    }
});

const Authorization = async (req, res, next) => {
    res.send({
        status: 200,
        message: "success",
    });
};

const LogoutController = async (req, res, next) => {};

module.exports = {
    RegisterController,
    LoginController,
    Authorization,
    LogoutController,
};
