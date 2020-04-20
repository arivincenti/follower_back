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
const comment_1 = __importDefault(require("../models/comment"));
const response_controller_1 = require("./response.controller");
const server_1 = __importDefault(require("../classes/server"));
// ==================================================
// get comments
// ==================================================
exports.getComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var ticket_id = req.params.ticket;
        var comments = yield comment_1.default.find({ ticket: ticket_id })
            .populate({
            path: "ticket",
            model: "Ticket",
        })
            .populate({
            path: "created_by",
            model: "User",
        })
            .sort({ created_at: -1 });
        response_controller_1.getResponse(res, 200, true, "", `Busqueda realizada con éxito`, comments);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Add Comment
// ==================================================
exports.addComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const body = req.body;
        const comment_body = {
            ticket: body.ticket,
            message: body.message,
            type: body.type,
            created_at: new Date(),
            created_by: body.created_by,
        };
        let comment = yield comment_1.default.create(comment_body);
        let comment_saved = yield comment_1.default.findById(comment._id)
            .populate({
            path: "ticket",
            model: "Ticket",
        })
            .populate({
            path: "created_by",
            model: "User",
        })
            .exec();
        server_1.default.instance.io
            .to(comment_saved.ticket._id)
            .emit("new-comment", comment_saved);
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", comment_saved);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
