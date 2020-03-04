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
class NotificationSocketController {
    constructor() { }
    // ==================================================
    // Add new Client
    // ==================================================
    createNotification(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            var newNotification = {
                changes: [...payload.changes],
                object: payload.object,
                objectType: payload.objectType,
                objectName: payload.objectName,
                updated_by: payload.updated_by,
                users: [...payload.users],
                readed_by: []
            };
            var pre_notification = yield notification_1.default.create(newNotification);
            var notification = yield notification_1.default.findById(pre_notification._id).populate({
                path: "updated_by",
                model: "User"
            });
            server_1.default.instance.io
                .to(payload.area)
                .emit("new-notification", notification);
        });
    }
}
exports.NotificationSocketController = NotificationSocketController;
