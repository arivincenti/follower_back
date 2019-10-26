const userController = {};
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SEED } = require('../config/config');

// ==================================================
// Login method
// ==================================================
userController.login = async (req, res) => {

  try{
    res.json('login controller');

  }catch(error){
    res.status(500).json({
      ok:false,
      message: 'Error de servidor',
      error: error
    });
  }
}

// ==================================================
// Get all users
// ==================================================
userController.refreshToken = async (req, res) => {
  res.json('Refresh token');
}

module.exports = userController;