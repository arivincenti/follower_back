import Notification, { INotification } from "../models/notification";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import Server from "../classes/server";

// ==================================================
// Get unread Notifications
// ==================================================
export const getNotifications = async (req: Request, res: Response) => {
    try {
        //ID del usuario recibido por URL
        var user_id = [req.params.user];

        var userNotifications = await Notification.find({
            users: { $in: user_id },
        }).populate({
            path: " created_by",
            model: "User",
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
