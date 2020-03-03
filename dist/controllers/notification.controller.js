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
const notification_1 = __importDefault(require("../models/notification"));
const response_controller_1 = require("./response.controller");
const server_1 = __importDefault(require("../classes/server"));
// ==================================================
// Get all Notifications
// ==================================================
exports.getAllNotifications = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        //ID del usuario recibido por URL
        var user_id = req.params.user;
        var userNotifications = yield notification_1.default.find({
            users: { $in: user_id }
        });
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", userNotifications);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get unread Notifications
// ==================================================
exports.getUnreadNotifications = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        //ID del usuario recibido por URL
        var user_id = [req.params.user];
        console.log(user_id);
        var userNotifications = yield notification_1.default.find({
            $and: [
                { users: { $in: user_id } },
                { readed_by: { $not: { $all: user_id } } }
            ]
        });
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", userNotifications);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get unread Notifications
// ==================================================
exports.createNotification = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        //ID del usuario recibido por URL
        var body = req.body;
        console.log("llegamos al controller");
        var newNotification = {
            notification: body.notification,
            object: body.object,
            objectType: body.objectType,
            users: [...body.users],
            readed_by: []
        };
        var notification = yield notification_1.default.create(newNotification);
        server_1.default.instance.io.to(body.area).emit("new-notification", notification);
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", notification);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
