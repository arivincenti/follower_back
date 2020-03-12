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

        switch (payload.objectType) {
            case "ticket":
                var notification = await Notification.findById(
                    pre_notification._id
                )
                    .populate({
                        path: "updated_by",
                        model: "User"
                    })
                    .populate({
                        path: "object",
                        model: "Ticket"
                    });

                io.to(payload.object._id) //Ticket room
                    .emit("new-notification", notification);
                break;

            case "área":
                var notification = await Notification.findById(
                    pre_notification._id
                )
                    .populate({
                        path: "updated_by",
                        model: "User"
                    })
                    .populate({
                        path: "object",
                        model: "Area"
                    });

                io.to(payload.object._id) //Area room
                    .emit("new-notification", notification);
                break;

            default:
                break;
        }
    }
}
