import User, { IUser } from "../models/user";
import Member, { IMember } from "../models/member";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import { clientsSocketController } from "../sockets/clientsSockets/clientsSocket";
import Server from "../classes/server";

// ==================================================
// Get all members
// ==================================================
export const getMembers = async (req: Request, res: Response) => {
    try {
        var organization_id = req.params.organization;

        var members = await Member.find({
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
                    $options: "i",
                },
            }).limit(5);

            members = await Member.find({
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
            created_at: new Date(),
        });

        var saved_member = await newMember.save();

        var member: any = await Member.findOne({
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

        var members = await Member.find({
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

        var client: any = clientsSocketController.getClientByUser(
            member.created_by._id
        );

        const clientJoin: any = clientsSocketController.getClientByUser(
            body.user
        );

        var payload = {
            objectType: "member",
            object: member,
            operationType: "create",
            changes,
            members,
        };

        Server.instance.io.to(client.id).emit("create", payload);

        if (clientJoin !== null) {
            Server.instance.io
                .to(clientJoin.id)
                .emit("member-created", payload);
        }

        getResponse(
            res,
            200,
            true,
            "",
            `El miembro '${member._id}' se creó con éxito`,
            member
        );
    } catch (error) {
        console.log(error);
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Update a member
// ==================================================
export const activateMember = async (req: Request, res: Response) => {
    try {
        var member_id = req.params.member;
        var body = req.body;

        var member_payload = {
            deleted_at: body.deleted_at,
            updated_at: new Date(),
            updated_by: body.updated_by,
        };

        var member: any = await Member.findByIdAndUpdate(
            member_id,
            member_payload,
            { new: true }
        )
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

        var client: any = clientsSocketController.getClientByUser(
            body.updated_by._id
        );

        var payload = {
            objectType: "member",
            operationType: "update",
            changes,
            object: member,
            members,
        };

        Server.instance.io.to(client.id).emit("update", payload);

        getResponse(
            res,
            200,
            true,
            "",
            `El miembro '${member._id}' se modificó con éxito`,
            member
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Delete a member
// ==================================================
export const desactivateMember = async (req: Request, res: Response) => {
    try {
        var member_id = req.params.member;
        var body = req.body;

        var member_payload = {
            deleted_at: body.deleted_at,
            updated_at: body.deleted_at,
            updated_by: body.updated_by,
        };

        var member: any = await Member.findByIdAndUpdate(
            member_id,
            member_payload,
            { new: true }
        )
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

        var client: any = clientsSocketController.getClientByUser(
            body.updated_by._id
        );

        var payload = {
            objectType: "member",
            operationType: "update",
            changes,
            object: member,
            members,
        };

        Server.instance.io.to(client.id).emit("update", payload);

        getResponse(
            res,
            200,
            true,
            "",
            `El miembro '${member._id}' se modificó con éxito`,
            member
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
