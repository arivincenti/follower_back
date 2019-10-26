const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// ==================================================
// Login
// ==================================================
router.post('/auth/login', authController.login);

// ==================================================
// RefreshToken
// ==================================================
router.get('/auth/refreshToken', authController.refreshToken);


module.exports = router;