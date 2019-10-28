const userController = {};
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ResponseController = require('./response.controller');

// ==================================================
// Get all users
// ==================================================
userController.getUsers = async (req, res) => {
  try {
    var users = await User.find();

    if (!users) {
      ResponseController.getResponse(res, 404, false, "No existen usuarios en la base de datos", "Error al buscar los usuarios", null);
    }

    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, users);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Get all users
// ==================================================
userController.getUser = async (req, res) => {
  try {

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Get all users
// ==================================================
userController.createUser = async (req, res) => {

  try {
    var body = req.body;

    var user = new User({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      created_by: body.created_by || 'follower'
    });

    var savedUser = await user.save();

    ResponseController.getResponse(res, 200, true, "El usuario '" + savedUser.lastName + " " + savedUser.name + "' se creó con exito", null, users);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Get all users
// ==================================================
userController.updateUser = async (req, res) => {
  try {
    res.json('Update a user');
  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Get all users
// ==================================================
userController.deleteUser = async (req, res) => {
  try {
    res.json('Delete a user');
  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}


module.exports = userController;