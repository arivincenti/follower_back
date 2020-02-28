import Ticket, { ITicket } from "../models/ticket";
import Member, { IMember } from "../models/member";
import User, { IUser } from "../models/user";
import Area, { IArea } from "../models/area";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import Server from "../classes/server";
import { clientsSocketController } from "../sockets/clientsSocket";

// ==================================================
// Get all ticket
// ==================================================
export const getTickets = async (req: Request, res: Response) => {
    try {
        var tickets = await Ticket.find()
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

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", tickets);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get user ticket
// ==================================================
export const getTicketsByUser = async (req: Request, res: Response) => {
    try {
        var userId = req.params.user;

        var members = await Member.find({ user: userId });
        var areas = await Area.find({ members: { $in: members } });

        var tickets = await Ticket.find({
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

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", tickets);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get all ticket
// ==================================================
export const getTicket = async (req: Request, res: Response) => {
    try {
        var ticket_id = req.params.ticket;

        var ticket = await Ticket.findById(ticket_id)
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

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", ticket);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get all ticket
// ==================================================
export const createTicket = async (req: Request, res: Response) => {
    try {
        var body = req.body;

        var ticket: any = new Ticket({
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

        var saved_ticket = await ticket.save();

        ticket = await Ticket.findById(saved_ticket._id)
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

        getResponse(
            res,
            200,
            true,
            "",
            `El ticket '${ticket._id}' se creó con éxito`,
            ticket
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Update ticket
// ==================================================
export const updateTicket = async (req: Request, res: Response) => {
    try {
        var ticket_id = req.params.ticket;
        var body = req.body;

        var ticket: any = {
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

        ticket = await Ticket.findByIdAndUpdate(
            ticket_id,
            {
                ...ticket,
                $push: {
                    movements: movement
                }
            },
            { new: true }
        )
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

        Server.instance.io.emit("update-ticket", ticket);

        getResponse(
            res,
            200,
            true,
            "",
            `El ticket '${ticket._id}' se creó con éxito`,
            ticket
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
