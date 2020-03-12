import { Socket } from "socket.io";
import { clientsSocketController } from "../../sockets/clientsSockets/clientsSocket";
import { TicketSocketController } from "../../socketControllers/ticketControllers.ts/ticketSocketController";
import ticket from "../../models/ticket";

const ticketSocketController = new TicketSocketController();

// ==================================================
// Join to ticket
// ==================================================
export const joinToTicket = (socket: Socket) => {
    socket.on("join-ticket", payload => {
        ticketSocketController.joinToTicket(payload, socket);
    });
};

// ==================================================
// Join to all tickets
// ==================================================
export const joinAllTickets = (socket: Socket) => {
    socket.on("join-all-tickets", payload => {
        ticketSocketController.joinAllTickets(payload, socket);
    });
};

// ==================================================
// Leave a ticket
// ==================================================
export const leaveATicket = (socket: Socket) => {
    socket.on("leave-ticket", payload => {
        ticketSocketController.leaveATicket(payload, socket);
    });
};

// ==================================================
// Leave a ticket
// ==================================================
export const leaveAllTickets = (socket: Socket) => {
    socket.on("leave-all-tickets", payload => {
        ticketSocketController.leaveAllTickets(payload, socket);
    });
};
