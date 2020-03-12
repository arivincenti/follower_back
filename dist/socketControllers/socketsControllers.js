"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientsSocket_1 = require("../sockets/clientsSockets/clientsSocket");
// ==================================================
// Count room clients
// ==================================================
exports.countClients = (room, event, io) => {
    io.in(room).clients((err, clients) => {
        if (err)
            console.error(err);
        var res = clientsSocket_1.clientsSocketController.getClients(clients);
        io.to(room).emit(event, res);
    });
};
