const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { authSchema, loginValidate } = require("../../helpers/validationSchema");
const { hashedPassword, isValidPassword } = require("../../helpers/hashPassword");
const { signAccessToken, signRefreshAccessToken, verifyRefreshToken } = require("../../helpers/jwtHelper");

const RegisterController = asyncHandler(async (req, res) => {
    const { username, email, password } = await authSchema.validateAsync(req.body);
    if (!username || !email || !password) {
        return res.status(400).send({
            status: 400,
            message: "Please fill all the fields",
        });
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        return res.status(409).send({
            status: 409,
            message: "Conflict Email already exists",
        });
    }
    // hash password
    const hashPassword = hashedPassword(password);

    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });

    if (user) {
        const accessToken = await signAccessToken(user._id.toString(), "1h");
        const refreshToken = await signRefreshAccessToken(user._id.toString());
        return res.status(200).send({
            status: 200,
            message: 'success',
            userData: user,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } else {
        return res.status(400).send({
            status: 400,
            message: "Invalid user data",
        });
    }
});

const LoginController = asyncHandler(async (req, res) => {
    try {
        const { email, password } = await loginValidate.validateAsync(req.body);
        if (!email || !password) {
            return res.status(401).send({
                status: 401,
                message: "Please fill all the fields",
            });
        }

        const user = await User.findOne({ "email": email });
        if (!user) {
            return res.status(401).send({
                status: 401,
                message: "Invalid email",
            });
        }

        const checkPassword = isValidPassword(password, user.password);
        if (!checkPassword) {
            return res.status(401).send({
                status: 401,
                message: "Invalid password",
            });
        }

        const accessToken = await signAccessToken(user._id.toString(), "1h");
        const refreshToken = await signRefreshAccessToken(user._id.toString());

        return res.status(200).send({
            status: 200,
            message: 'success',
            userData: user,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (err) {
        return res.status(401).send({
            message: "Invalid email or password",
        });
    }
});

const Authorization = async (req, res, next) => {
    res.send({
        status: 200,
        message: "success",
    });
};

const LogoutController = async (req, res, next) => {
};

module.exports = {
    RegisterController,
    LoginController,
    Authorization,
    LogoutController,
};
