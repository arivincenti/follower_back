import Ticket, { ITicket } from "../models/ticket";
import Member, { IMember } from "../models/member";
import Area, { IArea } from "../models/area";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import Server from "../classes/server";
import { clientsSocketController } from "../sockets/clientsSockets/clientsSocket";

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
                model: "Area",
                populate: {
                    path: "area.members",
                    model: "Member"
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
                model: "Member",
                populate: {
                    path: "user",
                    model: "User"
                }
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
                model: "Member",
                populate: {
                    path: "user",
                    model: "User"
                }
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
                model: "Member",
                populate: {
                    path: "user",
                    model: "User"
                }
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
            status: "PENDIENTE",
            created_by: body.created_by,
            created_at: new Date()
        });

        var movement = {
            area: body.area,
            responsible: null,
            followers: [],
            priority: body.priority,
            status: "PENDIENTE",
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
                model: "Member",
                populate: {
                    path: "user",
                    model: "User"
                }
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

        Server.instance.io.to(ticket.area._id).emit("new-ticket", ticket);

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
            status: body.status,
            updated_by: body.created_by,
            updated_at: new Date()
        };

        var movement = {
            area: body.area,
            responsible: body.responsible,
            followers: [],
            priority: body.priority,
            status: body.status,
            created_at: new Date(),
            created_by: body.created_by
        };

        var newTicket: any = await Ticket.findByIdAndUpdate(
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
                model: "Member",
                populate: {
                    path: "user",
                    model: "User"
                }
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

        var client: any = clientsSocketController.getClientByUser(
            body.created_by
        );

        var newMovement = newTicket.movements.pop();
        var oldMovement = newTicket.movements.splice(
            newTicket.movements.length - 1,
            1
        );

        var payload = {
            ticket: newTicket,
            old: oldMovement[0],
            new: newMovement
        };

        Server.instance.io.to(client.id).emit("update-ticket", payload);

        getResponse(
            res,
            200,
            true,
            "",
            `El ticket '${newTicket._id}' se creó con éxito`,
            newTicket
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
