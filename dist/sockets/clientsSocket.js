"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientsSocketController_1 = require("../socketControllers/clientsSocketController");
const client_1 = require("../classes/client");
exports.clientsSocketController = new clientsSocketController_1.ClientsSocketController();
exports.connectClient = (cliente) => {
    const client = new client_1.Client(cliente.id);
    exports.clientsSocketController.addClient(client);
};
exports.desconectar = (cliente) => {
    cliente.on("disconnect", () => {
        exports.clientsSocketController.deleteClient(cliente.id);
    });
};
exports.config_client = (cliente) => {
    cliente.on("config-client", (payload, callback) => {
        exports.clientsSocketController.updateClient(cliente.id, payload);
    });
};
exports.joinTicket = (cliente, io) => {
    cliente.on("join-ticket", payload => {
        cliente.join(payload);
    });
};
exports.leaveTicket = (cliente, io) => {
    cliente.on("leave-ticket", payload => {
        cliente.leave(payload);
    });
};
