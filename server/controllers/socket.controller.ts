import { clientsSocketController } from "../sockets/clientsSockets/clientsSocket";
import { Socket } from "socket.io";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import Server from "../classes/server";

// ==================================================
// Count room clients
// ==================================================
export const countClients = (req: Request, res: Response) => {
    try {
        var room = req.params.room;

        var roomClients: any[] = [];

        Server.instance.io
            .in(room.toString())
            .clients((err: any, clients: Socket) => {
                if (err) throw new Error(err);

                roomClients = [...clientsSocketController.getClients(clients)];

                getResponse(
                    res,
                    200,
                    true,
                    "",
                    "La búsqueda fue un éxito",
                    roomClients
                );
            });
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Count room clients
// ==================================================
export const getClients = (req: Request, res: Response) => {
    try {
        let list = clientsSocketController.getList();

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", list);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
