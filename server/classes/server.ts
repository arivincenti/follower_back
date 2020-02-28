import express from "express";
import routes from "../routes/routes";
import cors from "cors";
import fileUpload from "express-fileupload";
import Database from "../database/database";
import socketIO from "socket.io";
import http from "http";
import { SERVER_PORT } from "../config/environment";
import * as clientsSocket from "../sockets/clientsSocket";

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
            cors({ origin: "https://arivincenti.github.io", credentials: true })
        );
        // this.app.use( cors( { origin: true, credentials: true } ) );
        this.app.use(express.json());
        this.app.use(fileUpload());
    }

    routes() {
        this.app.use("/api", routes);
    }

    private escucharSocket() {
        this.io.on("connection", socket => {
            //Conect client
            clientsSocket.connectClient(socket);
            //Confi Client
            clientsSocket.config_client(socket);
            //Join client ticket
            clientsSocket.joinTicket(socket, this.io);
            //Leave client ticket
            clientsSocket.leaveTicket(socket, this.io);
            //Disconnect client
            clientsSocket.desconectar(socket);
        });
    }

    async start() {
        await this.httpServer.listen(this.app.get("port"));
        console.log(`Server corriendo en el puerto ${this.app.get("port")}`);

        new Database();
    }
}
