import { Socket } from "socket.io";
import { NotificationSocketController } from "../../socketControllers/notificationController/notificationSocketController";

export const notificationSocketController = new NotificationSocketController();

export const createNotification = (socket: Socket, io: SocketIO.Server) => {
    socket.on("create-notification", payload => {
        notificationSocketController.createNotification(payload);
    });
};
