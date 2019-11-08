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
router.get('/users/:user', userController.getUser);

// ==================================================
// Create a new user
// ==================================================
router.post('/users', userController.createUser);

// ==================================================
// Update a user
// ==================================================
router.put('/users/:user', userController.updateUser);

// ==================================================
// Delete a user
// ==================================================
router.delete('/users/:user', userController.deleteUser);

// ==================================================
// Get a user organizations
// ==================================================
router.get('/users/:user/organizations', userController.getUserOrganizations);

// ==================================================
// Get a user organization Areas
// ==================================================
router.get('/users/:user/organizations/:organization/areas', userController.getUserOrganizationAreas);

module.exports = router;