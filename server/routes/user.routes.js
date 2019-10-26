const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// ==================================================
// Get all users
// ==================================================
router.get('/users', userController.getUsers);

// ==================================================
// Get one user
// ==================================================
router.get('/users/:id', userController.getUser);

// ==================================================
// Create a new user
// ==================================================
router.post('/users', userController.createUser);

// ==================================================
// Update a user
// ==================================================
router.put('/users/:id', userController.updateUser);

// ==================================================
// Delete a user
// ==================================================
router.delete('/users/:id', userController.deleteUser);

module.exports = router;