import { Socket } from "socket.io";
import { clientsSocketController } from "../../sockets/clientsSockets/clientsSocket";

export const joinTicket = (socket: Socket, io: SocketIO.Server) => {
    socket.on("join-ticket", payload => {
        socket.join(payload);
        io.sockets.in(payload).clients((err: any, clients: Socket) => {
            if (err) console.log(err);
            var res = clientsSocketController.getClients(clients);
            io.to(payload).emit("ticket-clients-count", res);
        });
    });
};

export const joinAllTickets = (socket: Socket, io: SocketIO.Server) => {
    socket.on("join-all-tickets", payload => {
        for (let ticket of payload) {
            console.log(ticket);
        }
        // socket.join(payload);
    });
};

export const leaveTicket = (socket: Socket, io: SocketIO.Server) => {
    socket.on("leave-ticket", payload => {
        socket.leave(payload);
        io.sockets.in(payload).clients((err: any, clients: Socket) => {
            if (err) console.log(err);
            var res = clientsSocketController.getClients(clients);
            io.to(payload).emit("ticket-clients-count", res);
        });
    });
};
