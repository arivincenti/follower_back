const userController = {};

const User = require('../models/user');
const ResponseController = require('./response.controller');

// ==================================================
// Get all users
// ==================================================
userController.getUsers = async (req, res) => {
  try {
    var users = await User.find();

    if (!users) throw new Error('No se encontraron usuarios');

    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", users);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

// ==================================================
// Get an user
// ==================================================
userController.getUser = async (req, res) => {
  try {
    var user_id = req.params.user;

    var user = await User.findById(user_id);

    if (!user) throw new Error('No se encontró el usuario');

    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", user);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

// ==================================================
// Get an user by email
// ==================================================
userController.getUserByEmail = async (req, res) => {
  try {
    var email = req.body.email;
    var users = [];

    if (email) {
      users = await User.find({
        email: {
          $regex: email,
          $options: 'i'
        }
      }).limit(5);
    }

    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", users);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

// ==================================================
// Update an user
// ==================================================
userController.updateUser = async (req, res) => {
  try {
    var user_id = req.params.user;
    var body = req.body;

    var user = await User.findById(user_id);

    if (!user) throw new Error('No se encontró el usuario');

    if (body.name) user.name = body.name;
    if (body.last_name) user.last_name = body.last_name;
    if (body.email) user.email = body.email;

    if (body.name || body.last_name || body.email) user.updated_at = new Date();

    var saved_user = await user.save();

    ResponseController.getResponse(res, 200, true, null, `El usuario ${saved_user.last_name} ${saved_user.name}  se actualizó con éxito`, saved_user);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

// ==================================================
// Delete an user
// ==================================================
userController.deleteUser = async (req, res) => {
  try {
    var user_id = req.params.user;

    var user = await User.findById(user_id);

    if (!user) throw new Error('No se encontró el usuario');

    user.deleted_at = new Date();

    var saved_user = await user.save();

    ResponseController.getResponse(res, 200, true, null, `El usuario '${saved_user.last_name}${saved_user.name}' se dió de baja con éxito`, saved_user);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

module.exports = userController;