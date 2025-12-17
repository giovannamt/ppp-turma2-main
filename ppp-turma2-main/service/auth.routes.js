const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');

router.post('/student/login', (req, res) => {
  const token = authService.login(req.body.email, req.body.password);
  if (!token) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ token });
});

module.exports = router;
