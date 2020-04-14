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
            select: "-password",
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "area.members",
                model: "Member",
            },
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization",
            },
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
            },
        })
            .populate({
            path: "movements.area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization",
            },
        })
            .populate({
            path: "movements.responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
            },
        })
            .populate({
            path: "movements.created_by",
            model: "User",
        })
            .populate({
            path: "comments.created_by",
            model: "User",
            select: "-password",
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
                { area: { $in: areas } },
            ],
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "members",
                model: "Member",
                populate: {
                    path: "user",
                    model: "User",
                },
            },
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization",
            },
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
            },
        })
            .populate({
            path: "movements.area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization",
            },
        })
            .populate({
            path: "movements.responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
            },
        })
            .populate({
            path: "movements.created_by",
            model: "User",
        })
            .populate({
            path: "comments.created_by",
            model: "User",
            select: "-password",
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
exports.getTicketsByResponsible = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var responsible = req.params.responsible;
        var tickets = yield ticket_1.default.find({ responsible: responsible })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "members",
                model: "Member",
                populate: {
                    path: "user",
                    model: "User",
                },
            },
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization",
            },
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
            },
        })
            .populate({
            path: "movements.area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization",
            },
        })
            .populate({
            path: "movements.responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
            },
        })
            .populate({
            path: "movements.created_by",
            model: "User",
        });
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", tickets);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get a ticket
// ==================================================
exports.getTicket = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var ticket_id = req.params.ticket;
        var ticket = yield ticket_1.default.findById(ticket_id)
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "members",
                model: "Member",
                populate: {
                    path: "user",
                    model: "User",
                },
            },
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization",
            },
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
            },
        })
            .populate({
            path: "movements.area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization",
            },
        })
            .populate({
            path: "movements.responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
            },
        })
            .populate({
            path: "movements.created_by",
            model: "User",
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
            status: "PENDIENTE",
            created_by: body.created_by,
            created_at: new Date(),
        });
        var movement = {
            area: body.area,
            responsible: null,
            followers: [],
            priority: body.priority,
            status: "PENDIENTE",
            created_at: new Date(),
            created_by: body.created_by,
        };
        ticket.movements.push(movement);
        var saved_ticket = yield ticket.save();
        ticket = yield ticket_1.default.findById(saved_ticket._id)
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "members",
                model: "Member",
                populate: {
                    path: "user",
                    model: "User",
                },
            },
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization",
            },
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
            },
        })
            .populate({
            path: "movements.area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization",
            },
        })
            .populate({
            path: "movements.responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
            },
        })
            .populate({
            path: "movements.created_by",
            model: "User",
        });
        var client = clientsSocket_1.clientsSocketController.getClientByUser(String(ticket.created_by._id));
        var changes = [
            `Tenés un nuevo ticket "${ticket.subject}" en el área "${ticket.area.name}" de la organización "${ticket.area.organization.name}"`,
        ];
        var payload = {
            objectType: "ticket",
            object: ticket,
            operationType: "create",
            changes,
            members: [...ticket.area.members],
        };
        server_1.default.instance.io.to(client.id).emit("create", payload);
        // Server.instance.io.to(ticket.area._id).emit("new-ticket", ticket);
        response_controller_1.getResponse(res, 200, true, "", `El ticket '${ticket._id}' se creó con éxito`, ticket);
    }
    catch (error) {
        console.log(error);
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
        var payload_ticket = {
            area: body.area,
            responsible: body.responsible,
            followers: [],
            priority: body.priority,
            status: body.status,
            date: body.date,
            updated_by: body.updated_by,
            updated_at: new Date(),
        };
        var movement = {
            area: body.area,
            responsible: body.responsible,
            followers: [],
            priority: body.priority,
            status: body.status,
            date: body.date,
            created_at: new Date(),
            created_by: body.updated_by,
        };
        var new_ticket = yield ticket_1.default.findByIdAndUpdate(ticket_id, Object.assign({}, payload_ticket, { $push: {
                movements: movement,
            } }), { new: true })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "members",
                model: "Member",
                populate: {
                    path: "user",
                    model: "User",
                },
            },
        })
            .populate({
            path: "area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization",
            },
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
            },
        })
            .populate({
            path: "updated_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "movements.area",
            model: "Area",
            populate: {
                path: "organization",
                model: "Organization",
            },
        })
            .populate({
            path: "movements.responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
            },
        })
            .populate({
            path: "movements.created_by",
            model: "User",
        });
        var client = clientsSocket_1.clientsSocketController.getClientByUser(body.updated_by);
        var oldMovement = body.ticket;
        var changes = [];
        var message = "";
        if (new_ticket.status !== oldMovement.status) {
            message = `El estado del ticket "${new_ticket.subject}" pasó de "${oldMovement.status}" a "${new_ticket.status}"`;
            changes.push(message);
        }
        if (new_ticket.priority !== oldMovement.priority) {
            message = `La prioridad del ticket "${new_ticket.subject}" pasó de "${oldMovement.priority}" a "${new_ticket.priority}"`;
            changes.push(message);
        }
        if (body.ticket.responsible) {
            if (String(new_ticket.responsible._id) !==
                String(body.ticket.responsible._id)) {
                message = `El responsable del ticket "${new_ticket.subject}" ahora es "${new_ticket.responsible.user.name} ${new_ticket.responsible.user.last_name}"`;
                changes.push(message);
            }
        }
        else {
            message = `El responsable del ticket "${new_ticket.subject}" ahora es "${new_ticket.responsible.user.name} ${new_ticket.responsible.user.last_name}"`;
            changes.push(message);
        }
        var payload = {
            objectType: "ticket",
            object: new_ticket,
            operationType: "update",
            changes,
            members: [...new_ticket.area.members],
        };
        server_1.default.instance.io.to(client.id).emit("update", payload);
        response_controller_1.getResponse(res, 200, true, "", `El ticket '${new_ticket._id}' se modificó con éxito`, new_ticket);
    }
    catch (error) {
        console.error(error);
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
