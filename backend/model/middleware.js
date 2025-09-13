const jwt = require("jsonwebtoken");
const jwt_password = "123123";

const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        return res.status(403).json({ message: "No authorization header" });
    }
    try {
        const decoded = jwt.verify(header, jwt_password);
        req.userId = decoded.id;
        next();
    } catch {
        res.status(403).json({ message: "You are not logged in" });
    }
};

module.exports = { userMiddleware };