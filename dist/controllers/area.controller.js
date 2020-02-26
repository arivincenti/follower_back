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
        var area = yield area_1.default.findById(area_id);
        if (body.name)
            area.name = body.name;
        if (body.updated_by)
            area.updated_by = body.updated_by;
        if (body.responsible) {
            if (area.responsible) {
                if (String(area.responsible) !== body.responsible._id) {
                    area.responsible = body.responsible;
                }
                else {
                    area.responsible = undefined;
                }
            }
            else {
                area.responsible = body.responsible;
            }
        }
        area.updated_at = new Date();
        area.deleted_at = body.deleted_at;
        var saved_area = yield area.save();
        var find_area = yield area_1.default.findById(saved_area._id)
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
        response_controller_1.getResponse(res, 200, true, "", `El área '${area.name}' fue modificada con éxito`, find_area);
    }
    catch (error) {
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
exports.addAreaMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var body = req.body;
        var area = yield area_1.default.findById(body.area);
        area.members.push(body.member._id);
        area.updated_at = new Date();
        var saved_area = yield area.save();
        var find_area = yield area_1.default.findById(saved_area._id)
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
        response_controller_1.getResponse(res, 200, true, "", `El área '${area}' fue modificada con éxito`, find_area);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
