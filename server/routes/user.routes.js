const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// ==================================================
// Get all users
// ==================================================

router.get('/', userController.getUsers);

module.exports = router;