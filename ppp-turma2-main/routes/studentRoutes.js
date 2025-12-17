const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const progressController = require('../controllers/progressController');
const { authenticate, authorizeStudent, authorizeInstructor } = require('../middleware/authMiddleware');

router.post('/register', studentController.register);
router.post('/login', studentController.login);

router.get('/', authenticate, authorizeInstructor, studentController.getAll);

router.get(
  '/progress/:studentId',
  authenticate,
  authorizeStudent,
  progressController.getStudentProgress
);

module.exports = router;
