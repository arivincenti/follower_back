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
// ==================================================
// Get all members
// ==================================================
exports.getMembers = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var organization_id = req.params.organization;
        var members = yield member_1.default.find({
            organization: organization_id
        })
            .populate({
            path: "user",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
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
            select: "-password"
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
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
                    $options: "i"
                }
            }).limit(5);
            members = yield member_1.default.find({
                $and: [
                    {
                        user: {
                            $in: users
                        }
                    },
                    { organization: organization }
                ]
            })
                .populate({
                path: "user",
                model: "User",
                select: "-password"
            })
                .populate({
                path: "created_by",
                model: "User",
                select: "-password"
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
            created_at: new Date()
        });
        var saved_member = yield newMember.save();
        var member = yield member_1.default.findOne({
            _id: saved_member._id
        })
            .populate({
            path: "user",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        });
        response_controller_1.getResponse(res, 200, true, "", `El miembro '${member._id}' se creó con éxito`, member);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Update a member
// ==================================================
exports.updateMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var member_id = req.params.member;
        var body = req.body;
        var member = yield member_1.default.findById(member_id)
            .populate({
            path: "user",
            model: "User",
            select: "-_password"
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "organization",
            model: "Organization"
        });
        if (body.deleted_at)
            member.deleted_at = undefined;
        member.updated_at = new Date();
        var saved_member = yield member.save();
        response_controller_1.getResponse(res, 200, true, "", `El miembro '${saved_member._id}' se modificó con éxito`, saved_member);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
// ==================================================
// Delete a member
// ==================================================
exports.deleteMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var member_id = req.params.member;
        var member = yield member_1.default.findById(member_id)
            .populate({
            path: "user",
            model: "User",
            select: "-_password"
        })
            .populate({
            path: "created_by",
            model: "User",
            select: "-password"
        })
            .populate({
            path: "organization",
            model: "Organization"
        });
        member.deleted_at = new Date();
        var saved_member = yield member.save();
        response_controller_1.getResponse(res, 200, true, "", `El miembro '${saved_member._id}' se dió de baja con éxito`, saved_member);
    }
    catch (error) {
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
