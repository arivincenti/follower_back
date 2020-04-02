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
const area_1 = __importDefault(require("../models/area"));
const member_1 = __importDefault(require("../models/member"));
const response_controller_1 = require("./response.controller");
const clientsSocket_1 = require("../sockets/clientsSockets/clientsSocket");
const server_1 = __importDefault(require("../classes/server"));
// ==================================================
// Get all areas
// ==================================================
exports.getAreas = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var organization_id = req.params.organization;
        var since = Number(req.query.since);
        var size = Number(req.query.size);
        var areas = yield area_1.default.find({
            organization: organization_id
        })
            .populate("organization")
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        })
            .sort({
            name: 1
        })
            .skip(since)
            .limit(size)
            .exec();
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", areas);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get all areas
// ==================================================
exports.getAreasByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var user = req.params.user;
        var memers = yield member_1.default.find({
            user: user
        });
        var areas = yield area_1.default.find({
            members: { $in: memers }
        });
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", areas);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get an area
// ==================================================
exports.getArea = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var area_id = req.params.area;
        var area = yield area_1.default.findById(area_id)
            .populate("organization")
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        });
        if (!area)
            throw new Error("No se encontró el área");
        response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", area);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Create an area
// ==================================================
exports.createArea = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var body = req.body;
        var saved_area = yield area_1.default.create({
            name: body.name,
            organization: body.organization,
            members: [],
            responsibles: [],
            created_by: body.user
        });
        var area = yield area_1.default.findById(saved_area._id)
            .populate("organization")
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        });
        response_controller_1.getResponse(res, 200, true, "", `El área '${saved_area.name}' se creó con éxito`, area);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Update an area
// ==================================================
exports.updateArea = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var area_id = req.params.area;
        var body = req.body;
        var area = {
            name: body.name,
            updated_by: body.updated_by,
            updated_at: new Date()
        };
        // if (body.responsible) {
        //     if (area.responsible) {
        //         if (String(area.responsible) !== body.responsible._id) {
        //             area.responsible = body.responsible;
        //         } else {
        //             area.responsible = undefined;
        //         }
        //     } else {
        //         area.responsible = body.responsible;
        //     }
        // }
        var saved_area = yield area_1.default.findByIdAndUpdate(area_id, area, {
            new: true
        })
            .populate("organization")
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "updated_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        });
        var client = clientsSocket_1.clientsSocketController.getClientByUser(body.updated_by);
        var changes = [
            `El área ${body.area.name} ahora se llama ${saved_area.name}`
        ];
        var payload = {
            objectType: "area",
            object: saved_area,
            changes,
            members: saved_area.members
        };
        server_1.default.instance.io.to(client.id).emit("update", payload);
        response_controller_1.getResponse(res, 200, true, "", `El área '${saved_area.name}' fue modificada con éxito`, saved_area);
    }
    catch (error) {
        console.error(error);
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Delete an area
// ==================================================
exports.deleteArea = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var area_id = req.params.area;
        var area = yield area_1.default.findByIdAndUpdate(area_id, {
            deleted_at: new Date()
        }, {
            new: true
        })
            .populate("organization")
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        });
        response_controller_1.getResponse(res, 200, true, "", `El área '${area.name}' fue dada de baja con éxito`, area);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Get Area Members
// ==================================================
exports.getAreaMembers = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var area_id = req.params.area;
        var area = yield area_1.default.findById(area_id);
        var members = yield member_1.default.find({
            _id: {
                $in: area.members
            }
        }).populate({
            path: "user",
            model: "User",
            select: "-password"
        });
        response_controller_1.getResponse(res, 200, true, "", `La busqueda fue un éxito`, members);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Add area member
// ==================================================
exports.createAreaMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var body = req.body;
        console.log(body.updated_by);
        var find_area = yield area_1.default.findByIdAndUpdate(body.area, {
            $push: {
                members: body.member._id
            },
            updated_by: body.updated_by,
            updated_at: new Date()
        }, { new: true })
            .populate("organization")
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        });
        var client = clientsSocket_1.clientsSocketController.getClientByUser(body.updated_by._id);
        var client_join = clientsSocket_1.clientsSocketController.getClientByUser(body.member.user._id);
        // console.log(client_leave);
        var changes = [
            `El miembro "${body.member.user.name} ${body.member.user.last_name}" fue agregado al área "${find_area.name}"`
        ];
        var payload = {
            objectType: "area",
            object: find_area,
            changes,
            members: find_area.members
        };
        server_1.default.instance.io.to(client_join.id).emit("member-created", payload);
        server_1.default.instance.io.to(client.id).emit("update", payload);
        response_controller_1.getResponse(res, 200, true, "", `El área '${body.area}' fue modificada con éxito`, find_area);
    }
    catch (error) {
        console.error(error);
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Delete area member
// ==================================================
exports.deleteAreaMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var body = req.body;
        var area = body.area;
        var member = body.member;
        var updated_by = body.updated_by;
        var find_area = yield area_1.default.findByIdAndUpdate(area._id, {
            $pull: {
                members: member._id
            },
            updated_at: new Date(),
            updated_by: updated_by
        }, { new: true })
            .populate("organization")
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password"
            }
        });
        var client = clientsSocket_1.clientsSocketController.getClientByUser(updated_by._id);
        var client_leave = clientsSocket_1.clientsSocketController.getClientByUser(member.user._id);
        // console.log(client_leave);
        var changes = [
            `El miembro "${body.member.user.name} ${body.member.user.last_name}" fue eliminado del área "${find_area.name}"`
        ];
        var payload = {
            memberUser: member.user,
            objectType: "area",
            object: find_area,
            changes,
            members: area.members
        };
        server_1.default.instance.io.to(client_leave.id).emit("member-deleted", payload);
        server_1.default.instance.io.to(client.id).emit("update", payload);
        response_controller_1.getResponse(res, 200, true, "", `El área '${find_area.name}' fue modificada con éxito`, find_area);
    }
    catch (error) {
        console.error(error);
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
