const userController = {};
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Area = require('../models/area');
const ResponseController = require('./response.controller');

// ==================================================
// Get all users
// ==================================================
userController.getUsers = async (req, res) => {
  try {
    var users = await User.find();

    if (!users) return ResponseController.getResponse(res, 404, false, "No existen usuarios en la base de datos", "Usuarios no encontrados", null);

    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, users);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Get an user
// ==================================================
userController.getUser = async (req, res) => {
  try {
    var user_id = req.params.user;

    var user = await User.findById(user_id);

    if (!user) return ResponseController.getResponse(res, 404, false, `No existe el usuario con id '${user_id}' en la base de datos`, "Error al buscar el usuario", null);

    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, user);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Get all user organizations
// ==================================================
userController.getUserOrganizations = async (req, res) => {
  try {
    var user_id = req.params.user;

    var areas = await Area.find({
        "members.user": user_id
      }, "organization")
      .populate({
        path: "organization",
        model: "Organization"
      });

    if (!areas) return ResponseController.getResponse(res, 404, false, `No existe el usuario con id '${user_id}' en la base de datos`, "Error al buscar el usuario", null);

    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, areas);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Create an user
// ==================================================
userController.createUser = async (req, res) => {

  try {
    var body = req.body;

    var user = new User({
      name: body.name,
      last_name: body.last_name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10)
    });

    var saved_user = await user.save();

    ResponseController.getResponse(res, 200, true, `El usuario '${saved_user.last_name} ${saved_user.name}' se creó con éxito`, null, saved_user);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
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

    if (!user) return ResponseController.getResponse(res, 404, false, `No existe el usuario con id '${user_id}' en la base de datos`, "Error al buscar el usuario", null);

    if (body.name) user.name = body.name;
    if (body.last_name) user.last_name = body.last_name;
    if (body.email) user.email = body.email;

    if(body.name || body.last_name || body.email) user.updated_at = new Date();

    var saved_user = await user.save();

    ResponseController.getResponse(res, 200, true, "El usuario '" + saved_user.last_name + " " + saved_user.name + "' se actualizó con éxito", null, saved_user);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Delete an user
// ==================================================
userController.deleteUser = async (req, res) => {
  try {
    var user_id = req.params.user;

    var user = await User.findById(user_id);

    if (!user) return ResponseController.getResponse(res, 404, false, `No existe el usuario con id '${user_id}' en la base de datos`, "Error al buscar el usuario", null);

    user.deleted_at = new Date();

    var saved_user = await user.save();

    ResponseController.getResponse(res, 200, true, `El usuario '${saved_user.last_name}${saved_user.name}' se dió de baja con éxito`, null, saved_user);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

module.exports = userController;