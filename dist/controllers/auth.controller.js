"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_controller_1 = require("./response.controller");
const user_1 = __importDefault(require("../models/user"));
const config_1 = require("../config/config");
// ==================================================
// Register
// ==================================================
exports.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var body = req.body;
        var user = new user_1.default({
            name: body.name,
            last_name: body.last_name,
            email: body.email,
            password: bcryptjs_1.default.hashSync(body.password, 10)
        });
        var saved_user = yield user.save();
        response_controller_1.getResponse(res, 200, true, "", `El usuario '${saved_user.last_name} ${saved_user.name}' se creó con éxito`, saved_user);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Login method
// ==================================================
exports.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let body = req.body;
        let user = yield user_1.default.findOne({
            email: body.email
        });
        if (!user)
            throw new Error("No se encontró el usuario");
        if (!bcryptjs_1.default.compareSync(body.password, user.password))
            throw new Error("Hubo un problema en las credenciales");
        user.password = ":)"; //Seteamos el password del usuario para que no se devuelva en el token
        //Se crea el token si todo va bien
        yield generateToken(user, res);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Refresh Token
// ==================================================
exports.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let body = req.body;
        yield generateToken(body.user, res);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Generacion de token
// ==================================================
function generateToken(user, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = jsonwebtoken_1.default.sign({
                user: user
            }, config_1.SEED, {
                expiresIn: 10800 //3 horas
            });
            return res.status(200).json({
                ok: true,
                data: user,
                token: token
            });
        }
        catch (error) {
            response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
        }
    });
}
