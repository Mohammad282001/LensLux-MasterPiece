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

    // Get user profile
    getUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: { exclude: ['password_hash'] },
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                status: 'success',
                data: { user },
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update user profile
    updateUser: async (req, res) => {
        const userId = req.user.id; // Assuming authentication middleware adds user ID to req object
        const { first_name, last_name, phone_number, role, date_of_birth, password } = req.body;

        try {
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the user attributes
            user.first_name = first_name || user.first_name;
            user.last_name = last_name || user.last_name;
            user.phone_number = phone_number || user.phone_number;
            user.role = role || user.role;
            user.date_of_birth = date_of_birth || user.date_of_birth;

            // If password is provided, update the password hash
            if (password) {
                user.password_hash = password;
            }

            await user.save();

            res.status(200).json({
                status: 'success',
                data: { user },
            });
        } catch (error) {
            console.error('Error in updateUser:', error);
            res.status(400).json({ error: error.message });
        }
    },

    // Soft delete user
    deleteUser: async (req, res) => {
        const userId = req.user.id; // Assuming authentication middleware adds user ID to req object

        try {
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Soft delete the user by setting `soft_deleted` to true
            user.soft_deleted = true;
            await user.save();

            res.status(204).json({
                status: 'success',
                message: 'User account has been soft deleted',
            });
        } catch (error) {
            console.error('Error in deleteUser:', error);
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = userController;
