const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');
const { authenticate, authorizeInstructor } = require('../middleware/authMiddleware');

router.post('/register', instructorController.register);
router.post('/login', instructorController.login);

router.get('/secure', authenticate, authorizeInstructor, (req, res) => {
  res.json({ message: 'Instructor access granted' });
});

module.exports = router;
