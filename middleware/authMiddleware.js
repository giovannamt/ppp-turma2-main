const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function authorizeInstructor(req, res, next) {
  if (req.user.role !== 'instructor') {
    return res.status(403).json({ message: 'Instructor access required' });
  }
  next();
}

function authorizeStudent(req, res, next) {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Student access required' });
  }
  next();
}

module.exports = {
  authenticate,
  authorizeInstructor,
  authorizeStudent
};
