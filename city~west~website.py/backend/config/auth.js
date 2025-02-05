// auth.js - Authentication Configuration

module.exports = {
    // Secret key for JWT (ensure to use a strong, unique key in production)
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-here',
  
    // JWT token expiration time (in seconds)
    jwtExpiration: process.env.JWT_EXPIRATION || '1h', // token expires in 1 hour
  
    // Refresh token expiration time (in seconds)
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '7d', // refresh token expires in 7 days
  
    // Configuration for password hashing (bcrypt)
    saltRounds: 10, // Determines the complexity of the hashed password
  
    // Function to generate JWT token
    generateAccessToken: (user) => {
      const jwt = require('jsonwebtoken');
      return jwt.sign({ userId: user._id, email: user.email }, module.exports.jwtSecret, {
        expiresIn: module.exports.jwtExpiration,
      });
    },
  
    // Function to generate refresh token
    generateRefreshToken: (user) => {
      const jwt = require('jsonwebtoken');
      return jwt.sign({ userId: user._id, email: user.email }, module.exports.jwtSecret, {
        expiresIn: module.exports.refreshTokenExpiration,
      });
    },
  
    // Middleware for authenticating JWT token
    authenticateToken: (req, res, next) => {
      const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Get token from Authorization header
  
      if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
      }
  
      try {
        const decoded = require('jsonwebtoken').verify(token, module.exports.jwtSecret);
        req.user = decoded; // Attach user data to the request object
        next();
      } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
      }
    },
  
    // Middleware for checking user roles (optional, can be customized)
    checkRole: (role) => {
      return (req, res, next) => {
        if (req.user && req.user.role === role) {
          next();
        } else {
          res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }
      };
    },
  };  