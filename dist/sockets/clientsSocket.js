"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientsSocketController_1 = require("../socketControllers/clientsSocketController");
const client_1 = require("../classes/client");
exports.clientsSocketController = new clientsSocketController_1.ClientsSocketController();
exports.connectClient = (socket) => {
    const client = new client_1.Client(socket.id);
    exports.clientsSocketController.addClient(client);
};
exports.desconectar = (socket) => {
    socket.on("disconnect", () => {
        exports.clientsSocketController.deleteClient(socket.id);
    });
};
exports.config_client = (socket) => {
    socket.on("config-client", payload => {
        exports.clientsSocketController.updateClient(socket.id, payload);
    });
};
exports.joinTicket = (socket, io) => {
    socket.on("join-ticket", payload => {
        socket.join(payload);
    });
};
exports.leaveTicket = (socket, io) => {
    socket.on("leave-ticket", payload => {
        socket.leave(payload);
    });
};
