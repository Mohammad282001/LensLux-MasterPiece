const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');

exports.protect = async (req, res, next) => {
    // Get token from headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'You are not logged in!' });
    }

    try {
        // Verify the token
        const decoded = verifyToken(token);
        // Find the user by ID
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }
        req.user = user; // Pass user information to the next middleware

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token!' });
    }
};
