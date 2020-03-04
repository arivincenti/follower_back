import Notification, { INotification } from "../../models/notification";
import Server from "../../classes/server";

export class NotificationSocketController {
    constructor() {}

    // ==================================================
    // Add new Client
    // ==================================================
    public async createNotification(payload: any) {
        var newNotification = {
            changes: [...payload.changes],
            object: payload.object,
            objectType: payload.objectType,
            objectName: payload.objectName,
            updated_by: payload.updated_by,
            users: [...payload.users],
            readed_by: []
        };

        var pre_notification = await Notification.create(newNotification);

        var notification = await Notification.findById(
            pre_notification._id
        ).populate({
            path: "updated_by",
            model: "User"
        });

        Server.instance.io
            .to(payload.area)
            .emit("new-notification", notification);
    }
}
