import Notification, { INotification } from "../../models/notification";
import Server from "../../classes/server";
import { clientsSocketController } from "../../sockets/clientsSockets/clientsSocket";
import { IUser } from "../../models/user";

// export class NotificationSocketController {
//     constructor() {}

//     // ==================================================
//     // Create notification
//     // ==================================================
//     public async createNotification(payload: any, io: SocketIO.Server) {
//         let notificationTitle = "";
//         var room = "";
//         switch (payload.objectType) {
//             case "ticket":
//                 room = payload.object.area._id;
//                 notificationTitle = payload.object.subject;
//                 break;
//             case "member":
//                 room = payload.object.organization._id;
//                 notificationTitle = payload.object.organization.name;
//                 break;
//             case "area":
//                 if (payload.operationType === "create") {
//                     room = payload.object.organization._id;
//                     notificationTitle = payload.object.organization.name;
//                 } else {
//                     room = payload.object._id;
//                     notificationTitle = `${payload.object.name} (${payload.object.organization.name})`;
//                 }
//                 break;
//             default:
//                 room = payload.object._id;
//                 notificationTitle = payload.object.name;
//                 break;
//         }

//         var newNotification = {
//             changes: [...payload.changes],
//             object: payload.object._id,
//             objectType: payload.objectType,
//             notificationTitle,
//             created_by: payload.created_by,
//             operationType: payload.operationType,
//             users: [...payload.users],
//             readed_by: [],
//         };

//         var pre_notification = await Notification.create(newNotification);

//         const notification = await pre_notification
//             .populate({
//                 path: "created_by",
//                 model: "User",
//                 select: "-password",
//             })
//             .execPopulate();

//         let socketTicketPayload = {
//             object: payload.object,
//             notification,
//         };

//         io.to(room) //Ticket room
//             .emit("new-notification", socketTicketPayload);
//     }
// }

export const createNotification = async (payload: any) => {
    let notificationTitle = "";

    switch (payload.objectType) {
        case "ticket":
            notificationTitle = payload.object.subject;
            break;
        case "member":
            notificationTitle = payload.object.organization.name;
            break;
        case "area":
            if (payload.operationType === "create") {
                notificationTitle = payload.object.organization.name;
            } else {
                notificationTitle = `${payload.object.name} (${payload.object.organization.name})`;
            }
            break;
        default:
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

    const notification = await pre_notification
        .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
        .execPopulate();

    let socketTicketPayload = {
        object: payload.object,
        notification,
    };

    payload.users.forEach((user: IUser) => {
        var client: any = clientsSocketController.getClientByUser(user._id);

        if (client !== null) {
            Server.instance.io
                .to(client.id)
                .emit("new-notification", socketTicketPayload);
        }
    });
};
