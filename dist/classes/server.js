"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../routes/routes"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const database_1 = __importDefault(require("../database/database"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const environment_1 = require("../config/environment");
const clientsSocket = __importStar(require("../sockets/clientsSocket"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.settings();
        this.middlewares();
        this.routes();
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSocket();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    settings() {
        this.app.set("port", this.port);
    }
    middlewares() {
        this.app.use(cors_1.default({ origin: true, credentials: true }));
        this.app.use(express_1.default.json());
        this.app.use(express_fileupload_1.default());
    }
    routes() {
        this.app.use("/api", routes_1.default);
    }
    escucharSocket() {
        this.io.on("connection", cliente => {
            //Conect client
            clientsSocket.connectClient(cliente);
            //Confi Client
            clientsSocket.config_client(cliente);
            //Join client ticket
            clientsSocket.joinTicket(cliente, this.io);
            //Leave client ticket
            clientsSocket.leaveTicket(cliente, this.io);
            //Disconnect client
            clientsSocket.desconectar(cliente);
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.httpServer.listen(this.app.get("port"));
            console.log(`Server corriendo en el puerto ${this.app.get("port")}`);
            new database_1.default();
        });
    }
}
exports.default = Server;
