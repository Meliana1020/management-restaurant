const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET semua user
router.get('/', userController.getAllUsers);

// POST user baru
router.post('/', userController.createUser);

// PUT update user
router.put('/:id', userController.updateUser);

// DELETE user
router.delete('/:id', userController.deleteUser);

module.exports = router;