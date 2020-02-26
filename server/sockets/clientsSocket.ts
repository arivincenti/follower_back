import { Socket } from "socket.io";
import { ClientsSocketController } from "../socketControllers/clientsSocketController";
import { Client } from "../classes/client";

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

export const joinTicket = (socket: Socket, io: SocketIO.Server) => {
    socket.on("join-ticket", payload => {
        socket.join(payload);
    });
};

export const leaveTicket = (socket: Socket, io: SocketIO.Server) => {
    socket.on("leave-ticket", payload => {
        socket.leave(payload);
    });
};
