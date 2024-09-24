const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { login, signup } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, (req, res) => {
    res.json({ message: `Welcome, ${req.user.first_name}` });
});

module.exports = router;
