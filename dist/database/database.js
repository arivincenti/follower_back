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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    // private URI =
    //     "mongodb+srv://follower:amFjt2afBZ4wj5ru@cluster0-jfhtw.mongodb.net/follower?retryWrites=true&w=majority";
    constructor() {
        this.URI = "mongodb://localhost:27017/follower";
        this.settings();
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(this.URI);
                console.log("Base de datos conectada");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    settings() {
        mongoose_1.default.set("useFindAndModify", false);
        mongoose_1.default.set("useCreateIndex", true);
        mongoose_1.default.set("useNewUrlParser", true);
        mongoose_1.default.set("useUnifiedTopology", true);
    }
}
exports.default = Database;
