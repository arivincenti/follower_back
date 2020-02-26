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
// const jwt = require("jsonwebtoken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
// ==================================================
// Verifica que el token sea válido
// ==================================================
exports.verifyToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var token = String(req.headers["token"]);
    jsonwebtoken_1.default.verify(token, config_1.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: "Token no valido",
                errors: err
            });
        }
        next();
    });
});
// ==================================================
// Verifica permiso por rol, en este caso si es ADMIN o el mismo usuario.
// ==================================================
// exports.verifyAdminOrMyself = (req, res, next) => {
//     var usuario = req.usuario;
//     var id = req.params.id;
//     if (usuario.role === "ADMIN_ROLE" || usuario._id === id) {
//         next();
//     } else {
//         return res.status(401).json({
//             ok: false,
//             mensaje: "No está autorizado"
//         });
//     }
// };
