import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getResponse } from "./response.controller";
import User, { IUser } from "../models/user";
import { SEED } from "../config/config";
import Server from "../classes/server";

// ==================================================
// Register
// ==================================================
export const register = async (req: Request, res: Response) => {
    try {
        var body = req.body;

        var user: IUser = new User({
            name: body.name,
            last_name: body.last_name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10)
        });

        var saved_user: IUser = await user.save();

        getResponse(
            res,
            200,
            true,
            "",
            `El usuario '${saved_user.last_name} ${saved_user.name}' se creó con éxito`,
            saved_user
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Login method
// ==================================================
export const login = async (req: Request, res: Response) => {
    try {
        let body = req.body;

        let user: any = await User.findOne({
            email: body.email
        });

        if (!user) throw new Error("No se encontró el usuario");

        if (!bcrypt.compareSync(body.password, user.password))
            throw new Error("Hubo un problema en las credenciales");

        user.password = ":)"; //Seteamos el password del usuario para que no se devuelva en el token

        //Se crea el token si todo va bien
        await generateToken(user, res);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Refresh Token
// ==================================================
export const refreshToken = async (req: Request, res: Response) => {
    try {
        let body = req.body;
        await generateToken(body.user, res);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Generacion de token
// ==================================================
async function generateToken(user: any, res: Response) {
    try {
        let token = jwt.sign(
            {
                user: user
            },
            SEED,
            {
                expiresIn: 10800 //3 horas
            }
        );

        return res.status(200).json({
            ok: true,
            data: user,
            token: token
        });
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
}
