import Notification, { INotification } from "../../models/notification";

export class NotificationSocketController {
    constructor() {}

    // ==================================================
    // Create notification
    // ==================================================
    public async createNotification(payload: any, io: SocketIO.Server) {
        var newNotification = {
            changes: [...payload.changes],
            object: payload.object._id,
            objectType: payload.objectType,
            objectName: payload.object.subject,
            updated_by: payload.updated_by,
            users: [...payload.users],
            readed_by: []
        };

        var pre_notification = await Notification.create(newNotification);

        var notification = await Notification.findById(
            pre_notification._id
        ).populate({
            path: "updated_by",
            model: "User",
            select: "-password"
        });

        let socketTicketPayload = {
            object: payload.object,
            notification
        };

        io.to(payload.object._id) //Ticket room
            .emit("new-notification", socketTicketPayload);
    }
}
