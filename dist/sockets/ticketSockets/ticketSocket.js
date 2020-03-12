"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ticketSocketController_1 = require("../../socketControllers/ticketControllers.ts/ticketSocketController");
const ticketSocketController = new ticketSocketController_1.TicketSocketController();
// ==================================================
// Join to ticket
// ==================================================
exports.joinToTicket = (socket) => {
    socket.on("join-ticket", payload => {
        ticketSocketController.joinToTicket(payload, socket);
    });
};
// ==================================================
// Join to all tickets
// ==================================================
exports.joinAllTickets = (socket) => {
    socket.on("join-all-tickets", payload => {
        ticketSocketController.joinAllTickets(payload, socket);
    });
};
// ==================================================
// Leave a ticket
// ==================================================
exports.leaveATicket = (socket) => {
    socket.on("leave-ticket", payload => {
        ticketSocketController.leaveATicket(payload, socket);
    });
};
// ==================================================
// Leave a ticket
// ==================================================
exports.leaveAllTickets = (socket) => {
    socket.on("leave-all-tickets", payload => {
        ticketSocketController.leaveAllTickets(payload, socket);
    });
};
