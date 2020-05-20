"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = __importDefault(require("../../models/notification"));
const server_1 = __importDefault(require("../../classes/server"));
const clientsSocket_1 = require("../../sockets/clientsSockets/clientsSocket");
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
exports.createNotification = (payload) => __awaiter(this, void 0, void 0, function* () {
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
            }
            else {
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
    var pre_notification = yield notification_1.default.create(newNotification);
    const notification = yield pre_notification
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
    payload.users.forEach((user) => {
        var client = clientsSocket_1.clientsSocketController.getClientByUser(user._id);
        if (client !== null) {
            server_1.default.instance.io
                .to(client.id)
                .emit("new-notification", socketTicketPayload);
        }
    });
});
