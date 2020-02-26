import User, { IUser } from "../models/user";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import { clientsSocketController } from "../sockets/clientsSocket";

// ==================================================
// Get all Users
// ==================================================
export const getUsers = async (req: Request, res: Response) => {
    try {
        var users = await User.find();

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", users);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get an user
// ==================================================
export const getUser = async (req: Request, res: Response) => {
    try {
        var user_id = req.params.user;

        var user = await User.findById(user_id);

        if (!user) throw new Error("No se encontró el usuario");

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", user);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get an user by email
// ==================================================
export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        var email = req.body.email;
        var users: any[] = [];

        if (email) {
            users = await User.find({
                email: {
                    $regex: email,
                    $options: "i"
                }
            }).limit(5);
        }

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", users);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Update an user
// ==================================================
export const updateUser = async (req: Request, res: Response) => {
    try {
        var user_id = req.params.user;
        var body = req.body;

        var user: any = await User.findById(user_id);

        if (!user) throw new Error("No se encontró el usuario");

        if (body.name) user.name = body.name;
        if (body.last_name) user.last_name = body.last_name;
        if (body.email) user.email = body.email;

        if (body.name || body.last_name || body.email)
            user.updated_at = new Date();

        var saved_user = await user.save();

        getResponse(
            res,
            200,
            true,
            "",
            `El usuario ${saved_user.last_name} ${saved_user.name}  se actualizó con éxito`,
            saved_user
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Delete an user
// ==================================================
export const deleteUser = async (req: Request, res: Response) => {
    try {
        var user_id = req.params.user;

        let user: any = await User.findById(user_id);

        if (!user) throw new Error("No se encontró el usuario");

        user.deleted_at = new Date();

        let saved_user: IUser = await user.save();

        getResponse(
            res,
            200,
            true,
            "",
            `El usuario '${saved_user.last_name}${saved_user.name}' se dió de baja con éxito`,
            saved_user
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get all Users
// ==================================================
export const getClients = async (req: Request, res: Response) => {
    try {
        var users = clientsSocketController.getList();

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", users);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
