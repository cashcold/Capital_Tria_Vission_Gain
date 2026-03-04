const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../UserModel/userModel');

async function authMiddleware(req, res, next) {
  const token = req.header('x-access-token');
  console.log('[authMiddleware] Token received:', !!token, token ? token.substring(0, 20) + '...' : null);

  if (!token) {
    console.log('[authMiddleware] No token provided');
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    jwt.verify(token, process.env.TokenSecret, async (err, decoded) => {
      if (err) {
        console.log('[authMiddleware] Token verification failed:', err.message);
        return res.status(401).send('Invalid token');
      }
      console.log('[authMiddleware] Token verified successfully for user:', decoded.user_id);
      
      // Check if user is frozen in database
      try {
        const dbUser = await User.findById(decoded.user_id);
        if (!dbUser) {
          console.log('[authMiddleware] User not found in database');
          return res.status(401).send('Invalid token');
        }
        if (dbUser.isFrozen) {
          console.log('[authMiddleware] User account is frozen:', decoded.user_id);
          return res.status(403).send('Your account has been frozen due to duplicate phone number usage. Please update your phone number to regain access.');
        }
      } catch (dbErr) {
        console.log('[authMiddleware] Database check error:', dbErr.message);
        return res.status(500).send('Server error');
      }
      
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.log('[authMiddleware] Catch error:', err.message);
    return res.status(500).send('Server error');
  }
}

module.exports = authMiddleware;
