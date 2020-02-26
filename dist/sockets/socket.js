"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketClientsController_1 = require("../socketControllers/clients/socketClientsController");
const client_1 = require("../classes/client");
exports.socketClientController = new socketClientsController_1.SocketClientController();
exports.connectClient = (cliente) => {
    const client = new client_1.Client(cliente.id);
    exports.socketClientController.addClient(client);
};
exports.desconectar = (cliente) => {
    cliente.on("disconnect", () => {
        console.log(`Cliente ${cliente.id} desconectado`);
        exports.socketClientController.deleteClient(cliente.id);
    });
};
exports.config_client = (cliente) => {
    cliente.on("config-client", (payload, callback) => {
        exports.socketClientController.updateClient(cliente.id, payload);
    });
};
exports.config_client_ticket = (cliente) => {
    cliente.on("config-client-ticket", (payload, callback) => {
        console.log(payload);
        exports.socketClientController.configClientTicket(cliente.id, payload);
    });
};
