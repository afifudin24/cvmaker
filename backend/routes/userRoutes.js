const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware'); // Import middleware checkRole
// Get all users (protected route)
// router.get('/', userController.getAllUsers);
// router.get('/', authenticateToken, checkRole(['admin']) , userController.getAllUsers);

// User
// Get user by ID (protected route)
// router.get(
//   '/getuserLogin',
//   authenticateToken,
//   checkRole(['user']),
//   userController.getUserById,
// );
router.get('/', userController.getAllUsers);
router.get('/getUser/:id', userController.getUserById);
router.post('/userinfo', userController.addUserInfo);
router.put('/userinfo/:id', userController.updateUserInfo);
// Create new user (protected route)
// router.post('/', userController.createUser);

// Update user by ID (protected route)
// router.put('/:id', authenticateToken, userController.updateUser);

// Delete user by ID (protected route)
// router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
