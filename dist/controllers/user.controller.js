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
const user_1 = __importDefault(require("../models/user"));
const response_controller_1 = require("./response.controller");
const clientsSocket_1 = require("../sockets/clientsSockets/clientsSocket");
// ==================================================
// Get all Users
// ==================================================
exports.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var users = yield user_1.default.find();
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", users);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get an user
// ==================================================
exports.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var user_id = req.params.user;
        var user = yield user_1.default.findById(user_id);
        if (!user)
            throw new Error("No se encontró el usuario");
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", user);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get an user by email
// ==================================================
exports.getUserByEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var email = req.body.email;
        var users = [];
        if (email) {
            users = yield user_1.default.find({
                email: {
                    $regex: email,
                    $options: "i"
                }
            }).limit(5);
        }
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", users);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Update an user
// ==================================================
exports.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var user_id = req.params.user;
        var body = req.body;
        var user = yield user_1.default.findById(user_id);
        if (!user)
            throw new Error("No se encontró el usuario");
        if (body.name)
            user.name = body.name;
        if (body.last_name)
            user.last_name = body.last_name;
        if (body.email)
            user.email = body.email;
        if (body.name || body.last_name || body.email)
            user.updated_at = new Date();
        var saved_user = yield user.save();
        response_controller_1.getResponse(res, 200, true, "", `El usuario ${saved_user.last_name} ${saved_user.name}  se actualizó con éxito`, saved_user);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Delete an user
// ==================================================
exports.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var user_id = req.params.user;
        let user = yield user_1.default.findById(user_id);
        if (!user)
            throw new Error("No se encontró el usuario");
        user.deleted_at = new Date();
        let saved_user = yield user.save();
        response_controller_1.getResponse(res, 200, true, "", `El usuario '${saved_user.last_name}${saved_user.name}' se dió de baja con éxito`, saved_user);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get all Users
// ==================================================
exports.getClients = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var users = clientsSocket_1.clientsSocketController.getList();
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", users);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
