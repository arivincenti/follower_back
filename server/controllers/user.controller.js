const userController = {};
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// ==================================================
// Get all users
// ==================================================
userController.getUsers = async (req, res) => {

  var users = await User.find();

  res.json({
    ok: true,
    data: users
  });
}

// ==================================================
// Get all users
// ==================================================
userController.getUser = async (req, res) => {
  res.json('Get one user');
}

// ==================================================
// Get all users
// ==================================================
userController.createUser = async (req, res) => {

  try{
    var body = req.body;
  
    var user = new User({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      created_by: body.created_by || 'follower'
    });
  
    await user.save()
    .then(user => {
      res.status(200).json({
        ok: true,
        data: user
      });
    })
    .catch(error => {
      res.status(400).json({
        ok:false,
        message: 'Error al guardar el usuario',
        error: error
      });
    });
  
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
userController.updateUser = async (req, res) => {
  res.json('Update a user');
}

// ==================================================
// Get all users
// ==================================================
userController.deleteUser = async (req, res) => {
  res.json('Delete a user');
}


module.exports = userController;