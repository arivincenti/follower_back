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
const member_1 = __importDefault(require("../models/member"));
const area_1 = __importDefault(require("../models/area"));
const response_controller_1 = require("./response.controller");
const server_1 = __importDefault(require("../classes/server"));
const clientsSocket_1 = require("../sockets/clientsSockets/clientsSocket");
// ==================================================
// Get all ticket
// ==================================================
exports.getTickets = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var tickets = yield ticket_1.default.find()
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "area",
            model: "Area"
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization"
            }
        })
            .populate({
            path: "responsible",
            model: "Member"
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User"
            }
        })
            .populate({
            path: "movements.area",
            model: "Area"
        })
            .populate({
            path: "movements.area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization"
            }
        })
            .populate({
            path: "movements.responsible",
            model: "Member"
        })
            .populate({
            path: "movements.responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User"
            }
        });
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", tickets);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get user ticket
// ==================================================
exports.getTicketsByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var userId = req.params.user;
        var members = yield member_1.default.find({ user: userId });
        var areas = yield area_1.default.find({ members: { $in: members } });
        var tickets = yield ticket_1.default.find({
            $or: [
                { created_by: userId },
                { responsible: { $in: members } },
                { area: { $in: areas } }
            ]
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "area",
            model: "Area"
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization"
            }
        })
            .populate({
            path: "responsible",
            model: "Member"
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User"
            }
        })
            .populate({
            path: "movements.area",
            model: "Area"
        })
            .populate({
            path: "movements.area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization"
            }
        })
            .populate({
            path: "movements.responsible",
            model: "Member"
        })
            .populate({
            path: "movements.responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User"
            }
        });
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", tickets);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get all ticket
// ==================================================
exports.getTicket = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var ticket_id = req.params.ticket;
        var ticket = yield ticket_1.default.findById(ticket_id)
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "area",
            model: "Area"
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization"
            }
        })
            .populate({
            path: "responsible",
            model: "Member"
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User"
            }
        })
            .populate({
            path: "movements.area",
            model: "Area"
        })
            .populate({
            path: "movements.area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization"
            }
        })
            .populate({
            path: "movements.responsible",
            model: "Member"
        })
            .populate({
            path: "movements.responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User"
            }
        });
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", ticket);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get all ticket
// ==================================================
exports.createTicket = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var body = req.body;
        var ticket = new ticket_1.default({
            subject: body.subject,
            issue: body.issue,
            area: body.area,
            responsible: null,
            followers: [],
            priority: body.priority,
            status: "ABIERTO",
            created_by: body.created_by,
            created_at: new Date()
        });
        var movement = {
            area: body.area,
            responsible: null,
            followers: [],
            priority: body.priority,
            status: "ABIERTO",
            created_at: new Date(),
            created_by: body.created_by
        };
        ticket.movements.push(movement);
        var saved_ticket = yield ticket.save();
        ticket = yield ticket_1.default.findById(saved_ticket._id)
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "area",
            model: "Area"
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization"
            }
        })
            .populate({
            path: "responsible",
            model: "Member"
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User"
            }
        })
            .populate({
            path: "movements.area",
            model: "Area"
        })
            .populate({
            path: "movements.area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization"
            }
        })
            .populate({
            path: "movements.responsible",
            model: "Member"
        })
            .populate({
            path: "movements.responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User"
            }
        });
        server_1.default.instance.io.to(ticket.area._id).emit("new-ticket", ticket);
        response_controller_1.getResponse(res, 200, true, "", `El ticket '${ticket._id}' se creó con éxito`, ticket);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Update ticket
// ==================================================
exports.updateTicket = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var ticket_id = req.params.ticket;
        var body = req.body;
        var ticket = {
            area: body.area,
            responsible: body.responsible,
            followers: [],
            priority: body.priority,
            status: "ABIERTO",
            updated_by: body.created_by,
            updated_at: new Date()
        };
        var movement = {
            area: body.area,
            responsible: body.responsible,
            followers: [],
            priority: body.priority,
            status: "ABIERTO",
            created_at: new Date(),
            created_by: body.created_by
        };
        var newTicket = yield ticket_1.default.findByIdAndUpdate(ticket_id, Object.assign({}, ticket, { $push: {
                movements: movement
            } }), { new: true })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "members",
                model: "Member",
                populate: {
                    path: "user",
                    model: "User"
                }
            }
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization"
            }
        })
            .populate({
            path: "responsible",
            model: "Member"
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User"
            }
        })
            .populate({
            path: "movements.area",
            model: "Area"
        })
            .populate({
            path: "movements.area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization"
            }
        })
            .populate({
            path: "movements.responsible",
            model: "Member"
        })
            .populate({
            path: "movements.responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User"
            }
        })
            .populate({
            path: "movements.created_by",
            model: "User"
        });
        var client = clientsSocket_1.clientsSocketController.getClientByUser(body.created_by);
        var newMovement = newTicket.movements.pop();
        var oldMovement = newTicket.movements.splice(newTicket.movements.length - 1, 1);
        var payload = {
            ticket: newTicket,
            old: oldMovement[0],
            new: newMovement
        };
        server_1.default.instance.io.to(client.id).emit("update-ticket", payload);
        response_controller_1.getResponse(res, 200, true, "", `El ticket '${newTicket._id}' se creó con éxito`, newTicket);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
