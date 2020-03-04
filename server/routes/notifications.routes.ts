import { Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import {
    getAllNotifications,
    getUnreadNotifications
} from "../controllers/notification.controller";

const notificationsRouter = Router();

// ==================================================
// Get all members
// ==================================================
notificationsRouter.get(
    "/notifications/all/:user",
    verifyToken,
    getAllNotifications
);

// ==================================================
// Get one member
// ==================================================
notificationsRouter.get(
    "/notifications/unread/:user",
    verifyToken,
    getUnreadNotifications
);

export default notificationsRouter;
