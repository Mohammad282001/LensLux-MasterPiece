// validators/authValidator.js
const { check } = require('express-validator');

const validateRegistration = [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

const validateLogin = [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
];

module.exports = {
    validateRegistration,
    validateLogin,
};
