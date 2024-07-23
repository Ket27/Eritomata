const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    const jwt_sign = jwt.sign({id}, 'secretkey');
    return jwt_sign;
}

module.exports = generateToken;