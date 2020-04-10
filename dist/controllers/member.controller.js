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
const member_1 = __importDefault(require("../models/member"));
const response_controller_1 = require("./response.controller");
const clientsSocket_1 = require("../sockets/clientsSockets/clientsSocket");
const server_1 = __importDefault(require("../classes/server"));
// ==================================================
// Get all members
// ==================================================
exports.getMembers = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var organization_id = req.params.organization;
        var members = yield member_1.default.find({
            organization: organization_id,
        })
            .populate({
            path: "user",
            model: "User",
            select: "-_password",
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "updated_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "organization",
            model: "Organization",
        });
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", members);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get a member
// ==================================================
exports.getMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var member_id = req.params.member;
        var member = yield member_1.default.findById(member_id)
            .populate({
            path: "user",
            model: "User",
            select: "-_password",
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "updated_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "organization",
            model: "Organization",
        });
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", member);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get member by email
// ==================================================
exports.getMemberByEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var email = req.body.email;
        var organization = req.body.organization;
        var users = [];
        var members = [];
        if (email) {
            users = yield user_1.default.find({
                email: {
                    $regex: email,
                    $options: "i",
                },
            }).limit(5);
            members = yield member_1.default.find({
                $and: [
                    {
                        user: {
                            $in: users,
                        },
                    },
                    { organization: organization },
                ],
            })
                .populate({
                path: "user",
                model: "User",
                select: "-_password",
            })
                .populate({
                path: "created_by",
                model: "User",
                select: "-password",
            })
                .populate({
                path: "updated_by",
                model: "User",
                select: "-password",
            })
                .populate({
                path: "organization",
                model: "Organization",
            })
                .limit(5);
        }
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", members);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Create a member
// ==================================================
exports.createMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var body = req.body;
        var newMember = new member_1.default({
            organization: body.organization._id,
            user: body.user,
            created_by: body.created_by,
            created_at: new Date(),
        });
        var saved_member = yield newMember.save();
        var member = yield member_1.default.findOne({
            _id: saved_member._id,
        })
            .populate({
            path: "user",
            model: "User",
            select: "-_password",
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "updated_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "organization",
            model: "Organization",
        });
        var members = yield member_1.default.find({
            organization: member.organization._id,
        })
            .populate({
            path: "user",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        });
        var changes = [
            `${member.user.name} ${member.user.last_name} ahora es miembro de ${member.organization.name}`,
        ];
        var client = clientsSocket_1.clientsSocketController.getClientByUser(member.created_by._id);
        const clientJoin = clientsSocket_1.clientsSocketController.getClientByUser(body.user);
        var payload = {
            objectType: "member",
            object: member,
            operationType: "create",
            changes,
            members,
        };
        server_1.default.instance.io.to(client.id).emit("create", payload);
        if (clientJoin !== undefined) {
            server_1.default.instance.io
                .to(clientJoin.id)
                .emit("member-created", payload);
        }
        response_controller_1.getResponse(res, 200, true, "", `El miembro '${member._id}' se creó con éxito`, member);
    }
    catch (error) {
        console.log(error);
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Update a member
// ==================================================
exports.activateMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var member_id = req.params.member;
        var body = req.body;
        var member_payload = {
            deleted_at: body.deleted_at,
            updated_at: new Date(),
            updated_by: body.updated_by,
        };
        var member = yield member_1.default.findByIdAndUpdate(member_id, member_payload, { new: true })
            .populate({
            path: "user",
            model: "User",
            select: "-_password",
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "updated_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "organization",
            model: "Organization",
        });
        var members = [];
        members.push(member);
        var changes = [
            `${member.user.name} ${member.user.last_name} fue activado en ${member.organization.name}`,
        ];
        var client = clientsSocket_1.clientsSocketController.getClientByUser(body.updated_by._id);
        var payload = {
            objectType: "member",
            operationType: "update",
            changes,
            object: member,
            members,
        };
        server_1.default.instance.io.to(client.id).emit("update", payload);
        response_controller_1.getResponse(res, 200, true, "", `El miembro '${member._id}' se modificó con éxito`, member);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Delete a member
// ==================================================
exports.desactivateMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var member_id = req.params.member;
        var body = req.body;
        var member_payload = {
            deleted_at: body.deleted_at,
            updated_at: body.deleted_at,
            updated_by: body.updated_by,
        };
        var member = yield member_1.default.findByIdAndUpdate(member_id, member_payload, { new: true })
            .populate({
            path: "user",
            model: "User",
            select: "-_password",
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "updated_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "organization",
            model: "Organization",
        });
        var members = [];
        members.push(member);
        var changes = [
            `${member.user.name} ${member.user.last_name} fue desactivado en ${member.organization.name}`,
        ];
        var client = clientsSocket_1.clientsSocketController.getClientByUser(body.updated_by._id);
        var payload = {
            objectType: "member",
            operationType: "update",
            changes,
            object: member,
            members,
        };
        server_1.default.instance.io.to(client.id).emit("update", payload);
        response_controller_1.getResponse(res, 200, true, "", `El miembro '${member._id}' se modificó con éxito`, member);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
