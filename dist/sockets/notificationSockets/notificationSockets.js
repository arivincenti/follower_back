"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { NotificationSocketController } from "../../socketControllers/notificationControllers/notificationSocketController";
// export const notificationSocketController = new NotificationSocketController();
// ==================================================
// Create notification
// ==================================================
exports.createNotification = (socket, io) => {
    socket.on("create-notification", (payload) => {
        // notificationSocketController.createNotification(payload, io);
    });
};
