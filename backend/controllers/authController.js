// // Direct import if models/user.js is the file
// const { User } = require('../models');



// const userController = {
//     async createUser(req, res) {
//         try {
//             const newUser = await User.create(req.body);
//             res.status(201).json(newUser);
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     },

//     async getUser(req, res) {
//         try {
//             const user = await User.findByPk(req.params.id);
//             if (!user) {
//                 return res.status(404).json({ error: 'User not found' });
//             }
//             res.status(200).json(user);
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     },

//     async updateUser(req, res) {
//         try {
//             const [updated] = await User.update(req.body, {
//                 where: { id: req.params.id }
//             });
//             if (updated) {
//                 const updatedUser = await User.findByPk(req.params.id);
//                 res.status(200).json(updatedUser);
//             } else {
//                 res.status(404).json({ error: 'User not found' });
//             }
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     },

//     async deleteUser(req, res) {
//         try {
//             const deleted = await User.destroy({
//                 where: { id: req.params.id }
//             });
//             if (deleted) {
//                 res.status(204).json();
//             } else {
//                 res.status(404).json({ error: 'User not found' });
//             }
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     },

//     async softDeleteUser(req, res) {
//         try {
//             const user = await User.findByPk(req.params.id);
//             if (!user) {
//                 return res.status(404).json({ error: 'User not found' });
//             }
//             const updated = await User.update(
//                 { soft_deleted: !user.soft_deleted },
//                 { where: { id: req.params.id } }
//             );
//             if (updated) {
//                 res.status(200).json({
//                     message: `User soft_delete status updated to ${!user.soft_deleted}`
//                 });
//             }
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     },

//     async getAllUsers(req, res) {
//         try {
//             console.log(User);
//             const users = await User.findAll();
//             res.status(200).json(users);
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     }
// };

// console.log(User);

// module.exports = userController;


// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { User } = require('../models');


// // Register a new user
// const registerUser = async (req, res) => {
//     const { email, password, first_name, last_name, phone_number, role, face_shape, soft_deleted, date_of_birth } = req.body;

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     try {
//         // Save the new user in the database
//         const user = await User.create({
//             username,
//             password: hashedPassword,
//         });

//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };




const { signToken } = require('../utils/jwt');
const bcrypt = require('bcryptjs');
const { User } = require('../models');


//user signup 
exports.signup = async (req, res) => {
    const { email, password, first_name, last_name, phone_number, role, date_of_birth } = req.body;

    try {
        const newUser = await User.create({
            email,
            password_hash: password, // It will be hashed automatically by Sequelize hooks
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
        res.status(400).json({ error: error.message });
    }
};


// User Login
exports.login = async (req, res) => {
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
        res.status(400).json({ error: error.message });
    }
};