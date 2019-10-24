const userController = {};
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');

// ==================================================
// Get all users
// ==================================================
userController.getUsers = (req, res) => {
  res.json('Get all users');
}


module.exports = userController;