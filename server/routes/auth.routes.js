const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// ==================================================
// Register
// ==================================================
router.post('/auth/register', authController.register);

// ==================================================
// Login
// ==================================================
router.post('/auth/login', authController.login);

// ==================================================
// RefreshToken
// ==================================================
router.get('/auth/refreshToken', authController.refreshToken);


module.exports = router;