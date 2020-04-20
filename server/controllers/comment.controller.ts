import Ticket, { ITicket } from "../models/ticket";
import Comment, { IComment } from "../models/comment";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import Server from "../classes/server";
import { clientsSocketController } from "../sockets/clientsSockets/clientsSocket";

// ==================================================
// get comments
// ==================================================
export const getComments = async (req: Request, res: Response) => {
    try {
        var ticket_id = req.params.ticket;
        var comments = await Comment.find({ ticket: ticket_id })
            .populate({
                path: "ticket",
                model: "Ticket",
            })
            .populate({
                path: "created_by",
                model: "User",
            })
            .sort({ created_at: -1 });

        getResponse(
            res,
            200,
            true,
            "",
            `Busqueda realizada con éxito`,
            comments
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
        const body = req.body;

        const comment_body: any = {
            ticket: body.ticket,
            message: body.message,
            type: body.type,
            created_at: new Date(),
            created_by: body.created_by,
        };

        let comment: any = await Comment.create(comment_body);

        let comment_saved: any = await Comment.findById(comment._id)
            .populate({
                path: "ticket",
                model: "Ticket",
            })
            .populate({
                path: "created_by",
                model: "User",
            })
            .exec();

        Server.instance.io
            .to(comment_saved.ticket._id)
            .emit("new-comment", comment_saved);

        getResponse(
            res,
            200,
            true,
            "",
            "La búsqueda fue un éxito",
            comment_saved
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
