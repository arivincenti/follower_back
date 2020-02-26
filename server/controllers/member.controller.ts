import User, { IUser } from "../models/user";
import Member, { IMember } from "../models/member";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";

// ==================================================
// Get all members
// ==================================================
export const getMembers = async (req: Request, res: Response) => {
    try {
        var organization_id = req.params.organization;

        var members = await Member.find({
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

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", members);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get a member
// ==================================================
export const getMember = async (req: Request, res: Response) => {
    try {
        var member_id = req.params.member;

        var member = await Member.findById(member_id)
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

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", member);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get member by email
// ==================================================
export const getMemberByEmail = async (req: Request, res: Response) => {
    try {
        var email = req.body.email;
        var organization = req.body.organization;
        var users = [];
        var members: any[] = [];

        if (email) {
            users = await User.find({
                email: {
                    $regex: email,
                    $options: "i"
                }
            }).limit(5);

            members = await Member.find({
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

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", members);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Create a member
// ==================================================
export const createMember = async (req: Request, res: Response) => {
    try {
        var body = req.body;

        var newMember = new Member({
            organization: body.organization._id,
            user: body.user,
            created_by: body.created_by,
            created_at: new Date()
        });

        var saved_member = await newMember.save();

        var member: any = await Member.findOne({
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

        getResponse(
            res,
            200,
            true,
            "",
            `El miembro '${member._id}' se creó con éxito`,
            member
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Update a member
// ==================================================
export const updateMember = async (req: Request, res: Response) => {
    try {
        var member_id = req.params.member;
        var body = req.body;

        var member: any = await Member.findById(member_id)
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

        if (body.deleted_at) member.deleted_at = undefined;

        member.updated_at = new Date();

        var saved_member = await member.save();

        getResponse(
            res,
            200,
            true,
            "",
            `El miembro '${saved_member._id}' se modificó con éxito`,
            saved_member
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Delete a member
// ==================================================
export const deleteMember = async (req: Request, res: Response) => {
    try {
        var member_id = req.params.member;

        var member: any = await Member.findById(member_id)
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

        var saved_member = await member.save();

        getResponse(
            res,
            200,
            true,
            "",
            `El miembro '${saved_member._id}' se dió de baja con éxito`,
            saved_member
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
