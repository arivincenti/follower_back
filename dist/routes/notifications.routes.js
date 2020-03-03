"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const notification_controller_1 = require("../controllers/notification.controller");
const notificationsRouter = express_1.Router();
// ==================================================
// Get all members
// ==================================================
notificationsRouter.get("/notifications/all/:user", authentication_1.verifyToken, notification_controller_1.getAllNotifications);
// ==================================================
// Get one member
// ==================================================
notificationsRouter.get("/notifications/unread/:user", authentication_1.verifyToken, notification_controller_1.getUnreadNotifications);
// ==================================================
// Get member by email
// ==================================================
notificationsRouter.post("/notifications", authentication_1.verifyToken, notification_controller_1.createNotification);
exports.default = notificationsRouter;
