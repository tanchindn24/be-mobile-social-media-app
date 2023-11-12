const bcrypt = require("bcrypt");

const HashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};
const IsValidPassword = (password, passwordSQL) => {
    return bcrypt.compareSync(password, passwordSQL);
};

module.exports = {
    hashedPassword: HashPassword,
    isValidPassword: IsValidPassword,
};
