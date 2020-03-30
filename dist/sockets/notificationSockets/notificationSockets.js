"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notificationSocketController_1 = require("../../socketControllers/notificationControllers/notificationSocketController");
exports.notificationSocketController = new notificationSocketController_1.NotificationSocketController();
// ==================================================
// Create notification
// ==================================================
exports.createNotification = (socket, io) => {
    socket.on("create-notification", payload => {
        exports.notificationSocketController.createNotification(payload, io);
    });
};
