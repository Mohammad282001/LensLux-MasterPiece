const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { login, signup, getUser, updateUser, deleteUser } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
// Protected routes
router.get("/userProfile", protect, getUser); // Only logged-in users can get their profile
router.put("/updateUser", protect, updateUser); // Use PUT for updating user data
router.delete("/deleteUser", protect, deleteUser); // Use DELETE for deleting a user


module.exports = router;
