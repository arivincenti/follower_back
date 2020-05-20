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
const notificationSocketController_1 = require("../socketControllers/notificationControllers/notificationSocketController");
// ==================================================
// Get all areas
// ==================================================
exports.getAreas = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var organization_id = req.params.organization;
        var areas = yield area_1.default.find({
            organization: organization_id,
        })
            .populate("organization")
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        })
            .sort({
            name: 1,
        });
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
            user: user,
        });
        var areas = yield area_1.default.find({
            members: { $in: memers },
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
            select: "-password",
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
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
            created_by: body.user,
        });
        var area = yield area_1.default.findById(saved_area._id)
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "organization",
            model: "Organization",
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        });
        var changes = [
            `Se creó el área "${area.name}" en "${area.organization.name}"`,
        ];
        let users = [];
        users.push(area.created_by);
        var payload = {
            objectType: "area",
            object: area,
            operationType: "create",
            changes,
            users,
            created_by: area.created_by,
        };
        notificationSocketController_1.createNotification(payload);
        response_controller_1.getResponse(res, 200, true, "", `El área '${area.name}' se creó con éxito`, area);
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
            updated_at: new Date(),
        };
        var saved_area = yield area_1.default.findByIdAndUpdate(area_id, area, {
            new: true,
        })
            .populate("organization")
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
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        });
        var changes = [
            `El área "${body.area.name}" ahora tiene el nombre "${saved_area.name}"`,
        ];
        let users = yield saved_area.members.map((member) => member.user);
        const payload = {
            objectType: "area",
            object: saved_area,
            operationType: "update",
            changes,
            users,
            created_by: body.updated_by,
        };
        notificationSocketController_1.createNotification(payload);
        response_controller_1.getResponse(res, 200, true, "", `El área '${saved_area.name}' fue modificada con éxito`, saved_area);
    }
    catch (error) {
        console.error(error);
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Activate area
// ==================================================
exports.activateArea = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const area_id = req.params.area;
        const body = req.body;
        const area = yield area_1.default.findByIdAndUpdate(area_id, {
            deleted_at: undefined,
            updated_by: body.updated_by,
        }, {
            new: true,
        })
            .populate("organization")
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        });
        const changes = [`El área "${area.name}" se activó"`];
        let users = yield area.members.map((member) => member.user);
        const payload = {
            objectType: "area",
            object: area,
            operationType: "update",
            changes,
            users,
            created_by: body.updated_by,
        };
        notificationSocketController_1.createNotification(payload);
        response_controller_1.getResponse(res, 200, true, "", `El área '${area.name}' fue dada de baja con éxito`, area);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Desactivate an area
// ==================================================
exports.desactivateArea = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const area_id = req.params.area;
        const body = req.body;
        const area = yield area_1.default.findByIdAndUpdate(area_id, {
            deleted_at: new Date(),
            updated_by: body.updated_by,
        }, {
            new: true,
        })
            .populate("organization")
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        });
        const changes = [`El área "${area.name}" se desactivó"`];
        let users = yield area.members.map((member) => member.user);
        const payload = {
            objectType: "area",
            object: area,
            operationType: "update",
            changes,
            users,
            created_by: body.updated_by,
        };
        notificationSocketController_1.createNotification(payload);
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
                $in: area.members,
            },
        }).populate({
            path: "user",
            model: "User",
            select: "-password",
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
        const find_area = yield area_1.default.findByIdAndUpdate(body.area, {
            $push: {
                members: body.member._id,
            },
            updated_by: body.updated_by,
            updated_at: new Date(),
        }, { new: true })
            .populate("organization")
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        });
        const clientJoin = clientsSocket_1.clientsSocketController.getClientByUser(body.member.user._id);
        const changes = [
            `"${body.member.user.name} ${body.member.user.last_name}" ahora es miembro del área "${find_area.name}"`,
        ];
        let users = yield find_area.members.map((member) => member.user);
        const payload = {
            memberCreated: body.member,
            objectType: "area",
            operationType: "update",
            object: find_area,
            changes,
            users,
            created_by: body.updated_by,
        };
        notificationSocketController_1.createNotification(payload);
        if (clientJoin !== null) {
            server_1.default.instance.io
                .to(clientJoin.id)
                .emit("member-created", payload);
        }
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
                members: member._id,
            },
            updated_at: new Date(),
            updated_by: updated_by,
        }, { new: true })
            .populate("organization")
            .populate({
            path: "created_by",
            model: "User",
            select: "-password",
        })
            .populate({
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        });
        const clientLeave = clientsSocket_1.clientsSocketController.getClientByUser(body.member.user._id);
        var changes = [
            `El miembro "${body.member.user.name} ${body.member.user.last_name}" fue eliminado del área "${find_area.name}"`,
        ];
        let users = yield body.area.members.map((member) => member.user);
        const payload = {
            memberDeleted: member,
            objectType: "area",
            operationType: "update",
            object: find_area,
            changes,
            users,
            created_by: body.updated_by,
        };
        notificationSocketController_1.createNotification(payload);
        if (clientLeave !== null) {
            server_1.default.instance.io
                .to(clientLeave.id)
                .emit("member-deleted", payload);
        }
        response_controller_1.getResponse(res, 200, true, "", `El área '${find_area.name}' fue modificada con éxito`, find_area);
    }
    catch (error) {
        console.error(error);
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Update an area
// ==================================================
exports.setResponsibleAreaMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const area_id = req.params.area;
        const body = req.body;
        let responsible = null;
        if (body.responsible) {
            if (body.area.responsible) {
                if (String(body.area.responsible._id) !== body.responsible._id) {
                    responsible = body.responsible;
                }
                else {
                    responsible = undefined;
                }
            }
            else {
                responsible = body.responsible;
            }
        }
        var saved_area = yield area_1.default.findByIdAndUpdate(area_id, { responsible }, {
            new: true,
        })
            .populate("organization")
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
            path: "responsible",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        })
            .populate({
            path: "members",
            model: "Member",
            populate: {
                path: "user",
                model: "User",
                select: "-password",
            },
        });
        var client = clientsSocket_1.clientsSocketController.getClientByUser(body.updated_by);
        var changes = [];
        if (responsible !== undefined) {
            changes.push(`Se asignó a "${body.responsible.user.name} ${body.responsible.user.last_name}" como miembro responsable del área "${body.area.name}"`);
        }
        else {
            changes.push(`El miembro "${body.responsible.user.name} ${body.responsible.user.last_name}" se quitó como responsable del área "${body.area.name}"`);
        }
        var payload = {
            objectType: "area",
            operationType: "update",
            object: saved_area,
            changes,
            members: saved_area.members,
        };
        server_1.default.instance.io.to(client.id).emit("update", payload);
        response_controller_1.getResponse(res, 200, true, "", `El área '${saved_area.name}' fue modificada con éxito`, saved_area);
    }
    catch (error) {
        console.error(error);
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
