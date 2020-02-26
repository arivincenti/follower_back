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
const ticket_1 = __importDefault(require("../models/ticket"));
const response_controller_1 = require("./response.controller");
const server_1 = __importDefault(require("../classes/server"));
// ==================================================
// get comments
// ==================================================
exports.getComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var ticket_id = req.params.ticket;
        var ticket = yield ticket_1.default.findById(ticket_id).populate({
            path: "comments.created_by",
            model: "User",
            select: "-password"
        });
        response_controller_1.getResponse(res, 200, true, "", `Busqueda realizada con éxito`, ticket.comments.reverse());
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
        var ticket_id = req.params.ticket;
        var body = req.body;
        var comment = {
            message: body.message,
            type: body.type,
            created_at: new Date(),
            created_by: body.created_by
        };
        var ticket = yield ticket_1.default.findByIdAndUpdate(ticket_id, {
            $push: {
                comments: comment
            }
        }, { new: true })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User"
            }
        })
            .populate({
            path: "comments.created_by",
            model: "User",
            select: "-password"
        });
        const server = server_1.default.instance;
        server.io.to(ticket._id).emit("new-comment");
        response_controller_1.getResponse(res, 200, true, "", `El ticket '${ticket._id}' se creó con éxito`, ticket.comments.pop() //Con pop devuelvo el ultimo elemento del arreglo
        );
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
