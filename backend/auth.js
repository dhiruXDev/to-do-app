const jwt = require("jsonwebtoken");
const CONFIG = require("./config/config");

const jwtSecret = CONFIG.jwtSecret;

function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ message: 'Missing authentication token' });
    }
    
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded.user;
      next();
    } catch (err) {
      return res.status(401).send({ message: 'Invalid authentication token' });
    }
  }
  module.exports = authenticate;