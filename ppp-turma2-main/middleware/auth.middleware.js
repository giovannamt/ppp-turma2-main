const jwt = require('jsonwebtoken');

module.exports = (role) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    try {
      const decoded = jwt.verify(token, 'secret');
      if (role && decoded.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
      }
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};
