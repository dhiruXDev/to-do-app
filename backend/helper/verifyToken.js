const jwt = require("jsonwebtoken");
const CONFIG = require("../config/config");
const jwtSecret = CONFIG.jwtSecret;
const verifyToken = (req, res, next) => {
	if (req.originalUrl == "/api/register" || req.originalUrl == "/api/login") {
		return next();
	}
	const authHeader = req.headers.authorization;
	if (authHeader) {
		jwt.verify(authHeader, jwtSecret, (err, user) => {
			if (err) res.status(403).json({ err: "token is not valid" });
			req.user = user;
			return next();
		});
	} else {
		return res.status(401).json({ err: "You are not authenticated" });
	}
};

module.exports = verifyToken;
