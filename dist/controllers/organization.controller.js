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
const organization_1 = __importDefault(require("../models/organization"));
const member_1 = __importDefault(require("../models/member"));
const response_controller_1 = require("./response.controller");
const server_1 = __importDefault(require("../classes/server"));
// const EmailController = require('./email.controller');
// const {
//   mailjet
// } = require('../config/config');
// ==================================================
// Get all organizations
// ==================================================
exports.getOrganizations = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        //ID del usuario recibido por URL
        var user_id = req.params.user;
        // Busca los ID de las organizaciones en las que el usuario es miembro de algun Área
        // y trae valores únicos en caso de que vengan repetidas
        var userIsMember = yield member_1.default.find({
            user: user_id
        }).distinct("organization");
        //Busca las organizaciones en base a dos condiciones
        //1) El usuario puede ser dueño de la organización sin ser miembro de la misma
        //2) El usuario puede no ser dueño, pero si ser miembro, en este caso la organización a la que pertenece vendria en la variable 'userIsMember'
        var userOrganizations = yield organization_1.default.find({
            $or: [
                {
                    created_by: user_id
                },
                {
                    _id: {
                        $in: userIsMember
                    }
                }
            ]
        }).populate({
            path: "created_by",
            model: "User",
            select: "-pasword"
        });
        //Devolvemos la colección  n de organizaciones en las que esta involucrado el usuario
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", userOrganizations);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get an organization
// ==================================================
exports.getOrganization = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var organization_id = req.params.organization;
        var organization = yield organization_1.default.findById(organization_id).populate({
            path: "created_by",
            model: "User",
            select: "-password"
        });
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", organization);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Create an organization
// ==================================================
exports.createOrganization = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var body = req.body;
        var savedOrganization = yield organization_1.default.create({
            name: body.name,
            created_by: body.user
        });
        var organization = yield organization_1.default.findById(savedOrganization._id).populate({
            path: "created_by",
            model: "User",
            select: "-pasword"
        });
        // var email = `${organization.created_by.email}`;
        // var name = `${organization.created_by.name} ${organization.created_by.last_name}`;
        // var subject = `Tu organización se creó con éxito`;
        // var textPart = `Genial! Creaste a ${organization.name}, buen nombre para tu organización.`;
        // EmailController.sendEmail(email, name, subject, textPart, '');
        response_controller_1.getResponse(res, 200, true, "", `La organización '${organization.name}' se creó con éxito`, organization);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Update an organization
// ==================================================
exports.updateOrganization = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var organization_id = req.params.organization;
        var body = req.body;
        var object = {
            deleted_at: body.deleted_at
        };
        if (body.name) {
            object.name = body.name;
            object.updated_at = new Date();
        }
        var savedOrganization = yield organization_1.default.findByIdAndUpdate(organization_id, object, { new: true }).populate({
            path: "created_by",
            model: "User",
            select: "-pasword"
        });
        const server = server_1.default.instance;
        server.io.emit("organization-update");
        response_controller_1.getResponse(res, 200, true, "", `La organización '${savedOrganization.name}' se actualizó con éxito`, savedOrganization);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Delete an organization
// ==================================================
exports.deleteOrganization = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var organization_id = req.params.organization;
        var savedOrganization = yield organization_1.default.findByIdAndUpdate(organization_id, { deleted_at: new Date() }, { new: true }).populate({
            path: "created_by",
            model: "User",
            select: "-pasword"
        });
        response_controller_1.getResponse(res, 200, true, "", `La organización '${savedOrganization.name}' fue dada de baja con éxito`, savedOrganization);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
