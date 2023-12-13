const Joi = require("@hapi/joi");
const authSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
});

const LoginValidate = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
});

module.exports = {
    authSchema: authSchema,
    loginValidate: LoginValidate
};
