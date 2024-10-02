const { User } = require('../models');
const { signToken } = require('../utils/jwt');
const bcrypt = require('bcryptjs');

const userController = {
    // User signup
    signup: async (req, res) => {
        const { email, password, first_name, last_name, phone_number, role, date_of_birth } = req.body;

        try {
            // Check if the email already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Create new user
            const newUser = await User.create({
                email,
                password_hash: password, // Password will be hashed by Sequelize hook
                first_name,
                last_name,
                phone_number,
                role,
                date_of_birth,
            });

            const token = signToken(newUser.id);
            res.status(201).json({
                status: 'success',
                token,
                data: {
                    user: newUser,
                },
            });
        } catch (error) {
            console.error('Error in signup:', error);
            res.status(400).json({ error: error.message });
        }
    },

    // User login
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user || !(await bcrypt.compare(password, user.password_hash))) {
                return res.status(401).json({ message: 'Incorrect email or password' });
            }

            const token = signToken(user.id);

            res.status(200).json({
                status: 'success',
                token,
                data: {
                    user,
                },
            });
        } catch (error) {
            console.error('Error in login:', error);
            res.status(400).json({ error: error.message });
        }
    },

    // Additional user management methods can be added here (getUser, updateUser, deleteUser, etc.)
};

module.exports = userController;
