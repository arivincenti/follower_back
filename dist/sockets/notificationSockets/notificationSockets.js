"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notificationSocketController_1 = require("../../socketControllers/notificationController/notificationSocketController");
exports.notificationSocketController = new notificationSocketController_1.NotificationSocketController();
exports.createNotification = (socket, io) => {
    socket.on("create-notification", payload => {
        exports.notificationSocketController.createNotification(payload);
    });
};
