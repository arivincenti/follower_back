import express from "express";
import routes from "../routes/routes";
import cors from "cors";
import fileUpload from "express-fileupload";
import Database from "../database/database";
import socketIO from "socket.io";
import http from "http";
import { SERVER_PORT } from "../config/environment";
import * as clientsSocket from "../sockets/clientsSockets/clientsSocket";
import * as ticketSocket from "../sockets/ticketSockets/ticketSocket";
import * as areaSocket from "../sockets/areaSockets/areaSocket";
import * as notificationSocket from "../sockets/notificationSockets/notificationSockets";

export default class Server {
    private app: express.Application;
    private static _instance: Server;
    private port: number | string;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.settings();
        this.middlewares();
        this.routes();

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSocket();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    settings() {
        this.app.set("port", this.port);
    }

    middlewares() {
        this.app.use(
            cors({
                origin: "http://localhost:4200",
                credentials: true
            })
        );
        // this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(express.json());
        this.app.use(fileUpload());
    }

    routes() {
        this.app.use("/api", routes);
    }

    private escucharSocket() {
        this.io.on("connection", socket => {
            //Connect client
            clientsSocket.connectClient(socket);
            //Config Client
            clientsSocket.config_client(socket);
            //Disconnect client
            clientsSocket.desconectar(socket);

            //Tickets
            ticketSocket.joinToTicket(socket);
            ticketSocket.joinAllTickets(socket);
            ticketSocket.leaveATicket(socket);
            ticketSocket.leaveAllTickets(socket);

            //Areas
            areaSocket.joinAllAreas(socket);
            areaSocket.leaveAnArea(socket);

            //Notifications
            notificationSocket.createNotification(socket, this.io);
        });
    }

    async start() {
        await this.httpServer.listen(this.app.get("port"));
        console.log(`Server corriendo en el puerto ${this.app.get("port")}`);

        new Database();
    }
}
