// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { SEED } from "../config/config";

// ==================================================
// Verifica que el token sea válido
// ==================================================
export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    var token = String(req.headers["token"]);

    jwt.verify(token, SEED, (err: Error, decoded: string | object) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: "Token no valido",
                errors: err
            });
        }

        next();
    });
};

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
