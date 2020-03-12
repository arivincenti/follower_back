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
// ==================================================
// Get unread Notifications
// ==================================================
exports.getNotifications = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        //ID del usuario recibido por URL
        var user_id = [req.params.user];
        var userNotifications = yield notification_1.default.find({
            users: { $in: user_id }
        })
            .populate({
            path: "updated_by",
            model: "User"
        })
            .populate({
            path: "object",
            model: "Area"
        });
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", userNotifications);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
