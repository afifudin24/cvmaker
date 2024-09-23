const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router.get('/getAllUser', AdminController.getAllUsers);
router.get('/getUserById/:id', AdminController.getUserById);
router.post('/createUser', AdminController.createUser);
router.put('/updateUser/:id', AdminController.updateUser);
router.delete('/deleteUser/:id', AdminController.deleteUser);

module.exports = router;
