import { Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import {
    getAllNotifications,
    getUnreadNotifications,
    createNotification
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

// ==================================================
// Get member by email
// ==================================================
notificationsRouter.post("/notifications", verifyToken, createNotification);

export default notificationsRouter;
