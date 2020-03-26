import { Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import {
    getTickets,
    getTicketsByUser,
    getTicket,
    createTicket,
    updateTicket,
    getTicketsByResponsible
} from "../controllers/ticket.controller";

const ticketRouter = Router();

// ==================================================
// Get all tickets
// ==================================================
ticketRouter.get("/tickets", verifyToken, getTickets);

// ==================================================
// Get user tickets
// ==================================================
ticketRouter.get("/tickets/user/:user", verifyToken, getTicketsByUser);

// ==================================================
// Get responsible tickets
// ==================================================
ticketRouter.get(
    "/tickets/responsible/:responsible",
    verifyToken,
    getTicketsByResponsible
);

// ==================================================
// Get one ticket
// ==================================================
ticketRouter.get("/tickets/:ticket", verifyToken, getTicket);

// ==================================================
// Create a new ticket
// ==================================================
ticketRouter.post("/tickets", verifyToken, createTicket);

// ==================================================
// Update a ticket
// ==================================================
ticketRouter.put("/tickets/:ticket", verifyToken, updateTicket);

export default ticketRouter;
