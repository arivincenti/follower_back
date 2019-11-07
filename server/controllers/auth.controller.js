const authController = {};
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {
  SEED
} = require('../config/config');
const ResponseController = require('./response.controller');

// ==================================================
// Login method
// ==================================================
authController.login = async (req, res) => {
  try {
    let body = req.body;

    let user = await User.findOne({
      email: body.email
    });

    if (!user) return ResponseController.getResponse(res, 404, false, "Hubo un problema al querer iniciar sesión", "Error en las credenciales", null);

    if (!bcrypt.compareSync(body.password, user.password)) return ResponseController.getResponse(res, 404, false, "Hubo un problema al querer iniciar sesión", "Error en las credenciales", null);

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
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
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
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

module.exports = authController;