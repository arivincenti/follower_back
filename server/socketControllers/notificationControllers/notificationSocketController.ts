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
            created_by: payload.created_by,
            operationType: payload.operationType,
            users: [...payload.users],
            readed_by: []
        };

        var pre_notification = await Notification.create(newNotification);

        var notification = await Notification.findById(
            pre_notification._id
        ).populate({
            path: "created_by",
            model: "User",
            select: "-password"
        });

        let socketTicketPayload = {
            object: payload.object,
            notification
        };

        var room = "";

        switch (payload.objectType) {
            case "member":
                room = payload.object.organization._id;
                break;
            default:
                room = payload.object._id;
                break;
        }

        io.to(room) //Ticket room
            .emit("new-notification", socketTicketPayload);
    }
}
