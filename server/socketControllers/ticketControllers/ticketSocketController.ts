import { Socket } from "socket.io";

export class TicketSocketController {
    constructor() {}

    // ==================================================
    // Join to ticket
    // ==================================================
    joinToTicket(payload: any, socket: Socket) {
        socket.join(payload);
        // this.countClients(payload, io);
    }

    // ==================================================
    // Join to all tickets
    // ==================================================
    joinAllTickets(payload: any, socket: Socket) {
        for (let ticket of payload) {
            socket.join(ticket._id);
        }
    }

    // ==================================================
    // Leave a ticket
    // ==================================================
    leaveATicket(payload: any, socket: Socket) {
        socket.leave(payload);
    }

    // ==================================================
    // Leave a ticket
    // ==================================================
    leaveAllTickets(payload: any, socket: Socket) {
        for (let ticket of payload) {
            socket.leave(ticket._id);
        }
    }
}
