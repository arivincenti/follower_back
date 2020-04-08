import Notification, { INotification } from "../../models/notification";

export class NotificationSocketController {
    constructor() {}

    // ==================================================
    // Create notification
    // ==================================================
    public async createNotification(payload: any, io: SocketIO.Server) {
        let notificationTitle = "";
        var room = "";
        switch (payload.objectType) {
            case "ticket":
                room = payload.object.area._id;
                // if (payload.operationType === "create") {
                //     room = payload.object.area._id;
                // } else {
                //     room = payload.object._id;
                // }
                notificationTitle = payload.object.subject;
                break;
            case "member":
                room = payload.object.organization._id;
                notificationTitle = payload.object.organization.name;
                break;
            case "area":
                if (payload.operationType === "create") {
                    console.log(payload.object);
                    room = payload.object.organization._id;
                    notificationTitle = payload.object.organization.name;
                } else {
                    room = payload.object._id;
                    notificationTitle = `${payload.object.name} (${payload.object.organization.name})`;
                }
                break;
            default:
                room = payload.object._id;
                notificationTitle = payload.object.name;
                break;
        }

        var newNotification = {
            changes: [...payload.changes],
            object: payload.object._id,
            objectType: payload.objectType,
            notificationTitle,
            created_by: payload.created_by,
            operationType: payload.operationType,
            users: [...payload.users],
            readed_by: [],
        };

        var pre_notification = await Notification.create(newNotification);

        var notification = await Notification.findById(
            pre_notification._id
        ).populate({
            path: "created_by",
            model: "User",
            select: "-password",
        });

        let socketTicketPayload = {
            object: payload.object,
            notification,
        };

        // switch (payload.objectType) {
        //     case "member":
        //         room = payload.object.organization._id;
        //         break;
        //     case "ticket":
        //         if (payload.operationType === "create") {
        //             room = payload.object.area._id;
        //         } else {
        //             room = payload.object._id;
        //         }
        //         break;
        //     case "area":
        //         if (payload.operationType === "create") {
        //             room = payload.object.organization;
        //         } else {
        //             room = payload.object._id;
        //         }
        //         break;
        //     default:
        //         room = payload.object._id;
        //         break;
        // }

        io.to(room) //Ticket room
            .emit("new-notification", socketTicketPayload);
    }
}
