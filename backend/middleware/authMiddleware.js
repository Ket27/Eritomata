const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.json({
            message : "User not authorized",
        })
    }

    try{
        const verify = jwt.verify(token, 'secretkey');
        req.userId = verify.id;
        next();
    }
    catch (err){
        return res.json({
            message : "Invalid or expired token",
        })
    }
}
