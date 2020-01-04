const authController = {};
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {
  SEED
} = require('../config/config');
const ResponseController = require('./response.controller');


// ==================================================
// Register
// ==================================================
authController.register = async (req, res) => {

  try {
    var body = req.body;

    var user = new User({
      name: body.name,
      last_name: body.last_name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10)
    });

    var saved_user = await user.save();

    ResponseController.getResponse(res, 200, true, null, `El usuario '${saved_user.last_name} ${saved_user.name}' se creó con éxito`, saved_user);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

// ==================================================
// Login method
// ==================================================
authController.login = async (req, res) => {
  try {
    let body = req.body;

    let user = await User.findOne({
      email: body.email
    });

    if (!user) throw new Error('No se encontró el usuario');

    if (!bcrypt.compareSync(body.password, user.password)) throw new Error('Hubo un problema en las credenciales');

    user.password = ":)"; //Seteamos el password del usuario para que no se devuelva en el token

    //Se crea el token si todo va bien
    await generateToken(user, res);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
};

// ==================================================
// Refresh Token
// ==================================================
authController.refreshToken = (req, res) => {
  try {
    generateToken(req.user, res);
  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
};

// ==================================================
// Generacion de token
// ==================================================
async function generateToken(user, res) {
  try {
    let token = jwt.sign({
      user: user
    }, SEED, {
      expiresIn: 14000
    });

    return res.status(200).json({
      ok: true,
      data: user,
      token: token
    });

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
};

module.exports = authController;