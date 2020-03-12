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
class NotificationSocketController {
    constructor() { }
    // ==================================================
    // Create notification
    // ==================================================
    createNotification(payload, io) {
        return __awaiter(this, void 0, void 0, function* () {
            var newNotification = {
                changes: [...payload.changes],
                object: payload.object._id,
                objectType: payload.objectType,
                objectName: payload.object.subject,
                updated_by: payload.updated_by,
                users: [...payload.users],
                readed_by: []
            };
            var pre_notification = yield notification_1.default.create(newNotification);
            switch (payload.objectType) {
                case "ticket":
                    var notification = yield notification_1.default.findById(pre_notification._id)
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
                    var notification = yield notification_1.default.findById(pre_notification._id)
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
        });
    }
}
exports.NotificationSocketController = NotificationSocketController;
