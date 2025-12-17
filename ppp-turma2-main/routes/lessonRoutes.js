const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { authenticate, authorizeInstructor } = rrequire('../middleware/authMiddleware')

router.post('/', authenticate, authorizeInstructor, lessonController.create);
router.get('/', authenticate, lessonController.getAll);

module.exports = router;