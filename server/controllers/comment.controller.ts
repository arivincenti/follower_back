import Ticket, { ITicket } from "../models/ticket";
import Comment, { IComment } from "../models/comment";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import Server from "../classes/server";
import { clientsSocketController } from "../sockets/clientsSocket";

// ==================================================
// get comments
// ==================================================
export const getComments = async (req: Request, res: Response) => {
    try {
        var ticket_id = req.params.ticket;

        var ticket: any = await Ticket.findById(ticket_id).populate({
            path: "comments.created_by",
            model: "User",
            select: "-password"
        });

        getResponse(
            res,
            200,
            true,
            "",
            `Busqueda realizada con éxito`,
            ticket.comments.reverse()
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Add Comment
// ==================================================
export const addComment = async (req: Request, res: Response) => {
    try {
        var ticket_id = req.params.ticket;
        var body = req.body;

        var comment: any = {
            message: body.message,
            type: body.type,
            created_at: new Date(),
            created_by: body.created_by
        };

        var ticket: any = await Ticket.findByIdAndUpdate(
            ticket_id,
            {
                $push: {
                    comments: comment
                }
            },
            { new: true }
        )
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

        var comment: any = await ticket.comments.pop(); //Con pop devuelvo el ultimo elemento del arreglo

        Server.instance.io.to(ticket._id).emit("new-comment", comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
