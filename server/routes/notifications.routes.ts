import { Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import { getNotifications } from "../controllers/notification.controller";

const notificationsRouter = Router();

// ==================================================
// Get one member
// ==================================================
notificationsRouter.get("/notifications/:user", verifyToken, getNotifications);

export default notificationsRouter;
