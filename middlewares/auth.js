// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.header('x-auth-token');
//   if (token) return res.status(401).json({ message: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();                                                 
//   } catch (err) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };


const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // decoded token will give user info
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
