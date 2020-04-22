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
            });

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", tickets);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get user ticket
// ==================================================
export const getTicketsByResponsible = async (req: Request, res: Response) => {
    try {
        var responsible = req.params.responsible;

        var tickets = await Ticket.find({ responsible: responsible })
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
                path: "followers",
                model: "User",
            });

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", tickets);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get a ticket
// ==================================================
export const getTicket = async (req: Request, res: Response) => {
    try {
        var ticket_id = req.params.ticket;

        var ticket = await Ticket.findById(ticket_id)
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
                path: "followers",
                model: "User",
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

        var saved_ticket = await ticket.save();

        ticket = await Ticket.findById(saved_ticket._id)
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
                path: "followers",
                model: "User",
            });

        var client: any = clientsSocketController.getClientByUser(
            String(ticket.created_by._id)
        );

        var changes: any = [
            `Tenés un nuevo ticket "${ticket.subject}" en el área "${ticket.area.name}" de la organización "${ticket.area.organization.name}"`,
        ];

        var payload = {
            objectType: "ticket",
            object: ticket,
            operationType: "create",
            changes,
            members: [...ticket.area.members],
        };

        Server.instance.io.to(client.id).emit("create", payload);

        // Server.instance.io.to(ticket.area._id).emit("new-ticket", ticket);

        getResponse(
            res,
            200,
            true,
            "",
            `El ticket '${ticket._id}' se creó con éxito`,
            ticket
        );
    } catch (error) {
        console.log(error);
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

        var payload_ticket: any = {
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

        var new_ticket: any = await Ticket.findByIdAndUpdate(
            ticket_id,
            {
                ...payload_ticket,
                $push: {
                    movements: movement,
                },
            },
            { new: true }
        )
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
                path: "followers",
                model: "User",
            });

        var client: any = clientsSocketController.getClientByUser(
            body.updated_by
        );

        var oldMovement = body.ticket;

        var changes: any = [];
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
            if (
                String(new_ticket.responsible._id) !==
                String(body.ticket.responsible._id)
            ) {
                message = `El responsable del ticket "${new_ticket.subject}" ahora es "${new_ticket.responsible.user.name} ${new_ticket.responsible.user.last_name}"`;
                changes.push(message);
            }
        } else {
            if (body.responsible) {
                message = `El responsable del ticket "${new_ticket.subject}" ahora es "${new_ticket.responsible.user.name} ${new_ticket.responsible.user.last_name}"`;
                changes.push(message);
            }
        }

        var payload = {
            objectType: "ticket",
            object: new_ticket,
            operationType: "update",
            changes,
            members: [...new_ticket.area.members],
        };

        Server.instance.io.to(client.id).emit("update", payload);

        getResponse(
            res,
            200,
            true,
            "",
            `El ticket '${new_ticket._id}' se modificó con éxito`,
            new_ticket
        );
    } catch (error) {
        console.error(error);
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Update ticket
// ==================================================
export const followTicket = async (req: Request, res: Response) => {
    try {
        var ticket_id = req.params.ticket;
        var body: any = req.body;

        var movement = {
            area: body.ticket.area,
            responsible: body.ticket.responsible,
            followers: [...body.ticket.followers],
            priority: body.ticket.priority,
            status: body.ticket.status,
            date: body.ticket.date,
            created_at: new Date(),
            created_by: body.user,
        };

        var new_ticket: any = await Ticket.findByIdAndUpdate(
            ticket_id,
            {
                $push: {
                    movements: movement,
                    followers: body.user,
                },
            },
            { new: true }
        )
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
                path: "followers",
                model: "User",
            });

        var client: any = clientsSocketController.getClientByUser(
            body.user._id
        );

        var changes: any = [
            `${body.user.name} ${body.user.last_name} ahora sigue el ticket ${new_ticket.subject}`,
        ];

        var payload = {
            objectType: "ticket",
            object: new_ticket,
            operationType: "update",
            changes,
            members: [...new_ticket.area.members],
        };

        Server.instance.io.to(client.id).emit("update", payload);

        getResponse(
            res,
            200,
            true,
            "",
            `El ticket '${new_ticket._id}' se modificó con éxito`,
            new_ticket
        );
    } catch (error) {
        console.error(error);
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Update ticket
// ==================================================
export const unfollowTicket = async (req: Request, res: Response) => {
    try {
        var ticket_id = req.params.ticket;
        var body: any = req.body;

        var movement = {
            area: body.ticket.area,
            responsible: body.ticket.responsible,
            followers: [...body.ticket.followers],
            priority: body.ticket.priority,
            status: body.ticket.status,
            date: body.ticket.date,
            created_at: new Date(),
            created_by: body.user,
        };

        movement.followers.filter((follower) => follower._id !== body.user._id);

        var new_ticket: any = await Ticket.findByIdAndUpdate(
            ticket_id,
            {
                $push: {
                    movements: movement,
                },
                $pull: {
                    followers: body.user._id,
                },
            },
            { new: true }
        )
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
                path: "followers",
                model: "User",
            });

        var client: any = clientsSocketController.getClientByUser(
            body.user._id
        );

        var changes: any = [
            `${body.user.name} ${body.user.last_name} ahora sigue el ticket ${new_ticket.subject}`,
        ];

        var payload = {
            objectType: "ticket",
            object: new_ticket,
            operationType: "update",
            changes,
            members: [...new_ticket.area.members],
        };

        Server.instance.io.to(client.id).emit("update", payload);

        getResponse(
            res,
            200,
            true,
            "",
            `El ticket '${new_ticket._id}' se modificó con éxito`,
            new_ticket
        );
    } catch (error) {
        console.error(error);
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
