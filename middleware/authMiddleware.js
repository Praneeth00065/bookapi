const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

function authMiddleware(secret) {
  return (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
      return res.status(403).json({ message: "You are not signed in" });
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.userId = decoded.id; // Attach user ID to request object
      next(); // Continue to the next middleware
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}

// Create middleware for user role as of now.can imlement two roles like admin and user as per your suggestions.
const userMiddleware = authMiddleware(JWT_USER_PASSWORD);

module.exports = { userMiddleware };
