"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const notification_controller_1 = require("../controllers/notification.controller");
const notificationsRouter = express_1.Router();
// ==================================================
// Get one member
// ==================================================
notificationsRouter.get("/notifications/:user", authentication_1.verifyToken, notification_controller_1.getNotifications);
exports.default = notificationsRouter;
