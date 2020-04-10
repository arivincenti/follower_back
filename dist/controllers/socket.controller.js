"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clientsSocket_1 = require("../sockets/clientsSockets/clientsSocket");
const response_controller_1 = require("./response.controller");
const server_1 = __importDefault(require("../classes/server"));
// ==================================================
// Count room clients
// ==================================================
exports.countClients = (req, res) => {
    try {
        var room = req.params.room;
        var roomClients = [];
        server_1.default.instance.io
            .in(room.toString())
            .clients((err, clients) => {
            if (err)
                throw new Error(err);
            roomClients = [...clientsSocket_1.clientsSocketController.getClients(clients)];
            response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", roomClients);
        });
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
// ==================================================
// Count room clients
// ==================================================
exports.getClients = (req, res) => {
    try {
        let list = clientsSocket_1.clientsSocketController.getList();
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", list);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
