const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { authenticate, authorizeInstructor } = require('../middleware/authMiddleware');

router.post('/', authenticate, authorizeInstructor, progressController.addProgress);

module.exports = router;
