import Notification, { INotification } from "../models/notification";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import Server from "../classes/server";

// ==================================================
// Get all Notifications
// ==================================================
export const getAllNotifications = async (req: Request, res: Response) => {
    try {
        //ID del usuario recibido por URL
        var user_id = req.params.user;

        var userNotifications = await Notification.find({
            users: { $in: user_id }
        });

        getResponse(
            res,
            200,
            true,
            "",
            "La búsqueda fue un éxito",
            userNotifications
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get unread Notifications
// ==================================================
export const getUnreadNotifications = async (req: Request, res: Response) => {
    try {
        //ID del usuario recibido por URL
        var user_id = [req.params.user];

        console.log(user_id);

        var userNotifications = await Notification.find({
            $and: [
                { users: { $in: user_id } },
                { readed_by: { $not: { $all: user_id } } }
            ]
        });

        getResponse(
            res,
            200,
            true,
            "",
            "La búsqueda fue un éxito",
            userNotifications
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get unread Notifications
// ==================================================
export const createNotification = async (req: Request, res: Response) => {
    try {
        //ID del usuario recibido por URL
        var body = req.body;

        console.log("llegamos al controller");

        var newNotification = {
            notification: body.notification,
            object: body.object,
            objectType: body.objectType,
            users: [...body.users],
            readed_by: []
        };

        var notification = await Notification.create(newNotification);

        Server.instance.io.to(body.area).emit("new-notification", notification);

        getResponse(
            res,
            200,
            true,
            "",
            "La búsqueda fue un éxito",
            notification
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
