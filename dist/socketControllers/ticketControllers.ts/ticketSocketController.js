"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TicketSocketController {
    constructor() { }
    // ==================================================
    // Join to ticket
    // ==================================================
    joinToTicket(payload, socket) {
        socket.join(payload);
        // this.countClients(payload, io);
    }
    // ==================================================
    // Join to all tickets
    // ==================================================
    joinAllTickets(payload, socket) {
        for (let ticket of payload) {
            socket.join(ticket._id);
        }
    }
    // ==================================================
    // Leave a ticket
    // ==================================================
    leaveATicket(payload, socket) {
        socket.leave(payload);
    }
    // ==================================================
    // Leave a ticket
    // ==================================================
    leaveAllTickets(payload, socket) {
        for (let ticket of payload) {
            socket.leave(ticket._id);
        }
    }
}
exports.TicketSocketController = TicketSocketController;
