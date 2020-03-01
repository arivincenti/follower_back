import { Socket } from "socket.io";
import { ClientsSocketController } from "../../socketControllers/clientsControllers/clientsSocketController";
import { Client } from "../../classes/client";

export const clientsSocketController = new ClientsSocketController();

export const connectClient = (socket: Socket) => {
    const client = new Client(socket.id);

    clientsSocketController.addClient(client);
};

export const desconectar = (socket: Socket) => {
    socket.on("disconnect", () => {
        clientsSocketController.deleteClient(socket.id);
    });
};

export const config_client = (socket: Socket) => {
    socket.on("config-client", payload => {
        clientsSocketController.updateClient(socket.id, payload);
    });
};
