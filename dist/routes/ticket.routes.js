"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const ticket_controller_1 = require("../controllers/ticket.controller");
const ticketRouter = express_1.Router();
// ==================================================
// Get all tickets
// ==================================================
ticketRouter.get("/tickets", authentication_1.verifyToken, ticket_controller_1.getTickets);
// ==================================================
// Get user tickets
// ==================================================
ticketRouter.get("/tickets/user/:user", authentication_1.verifyToken, ticket_controller_1.getTicketsByUser);
// ==================================================
// Get one ticket
// ==================================================
ticketRouter.get("/tickets/:ticket", authentication_1.verifyToken, ticket_controller_1.getTicket);
// ==================================================
// Create a new ticket
// ==================================================
ticketRouter.post("/tickets", authentication_1.verifyToken, ticket_controller_1.createTicket);
// ==================================================
// Update a ticket
// ==================================================
ticketRouter.put("/tickets/:ticket", authentication_1.verifyToken, ticket_controller_1.updateTicket);
exports.default = ticketRouter;
