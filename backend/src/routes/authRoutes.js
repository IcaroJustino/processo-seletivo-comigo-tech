const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/signup', authController.register);
router.post('/signin', authController.login);
router.get('/me', authenticateToken,authController.me);

module.exports = router;
