"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientsSocket_1 = require("../../sockets/clientsSockets/clientsSocket");
exports.joinTicket = (socket, io) => {
    socket.on("join-ticket", payload => {
        socket.join(payload);
        io.sockets.in(payload).clients((err, clients) => {
            if (err)
                console.log(err);
            var res = clientsSocket_1.clientsSocketController.getClients(clients);
            io.to(payload).emit("ticket-clients-count", res);
        });
    });
};
exports.joinAllTickets = (socket, io) => {
    socket.on("join-all-tickets", payload => {
        for (let ticket of payload) {
            console.log(ticket);
        }
        // socket.join(payload);
    });
};
exports.leaveTicket = (socket, io) => {
    socket.on("leave-ticket", payload => {
        socket.leave(payload);
        io.sockets.in(payload).clients((err, clients) => {
            if (err)
                console.log(err);
            var res = clientsSocket_1.clientsSocketController.getClients(clients);
            io.to(payload).emit("ticket-clients-count", res);
        });
    });
};
