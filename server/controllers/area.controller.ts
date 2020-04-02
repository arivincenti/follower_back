import Area, { IArea } from "../models/area";
import Member, { IMember } from "../models/member";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import member from "../models/member";
import { clientsSocketController } from "../sockets/clientsSockets/clientsSocket";
import Server from "../classes/server";

// ==================================================
// Get all areas
// ==================================================
export const getAreas = async (req: Request, res: Response) => {
    try {
        var organization_id = req.params.organization;
        var since = Number(req.query.since);
        var size = Number(req.query.size);

        var areas = await Area.find({
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

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", areas);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get all areas
// ==================================================
export const getAreasByUser = async (req: Request, res: Response) => {
    try {
        var user = req.params.user;

        var memers = await Member.find({
            user: user
        });

        var areas = await Area.find({
            members: { $in: memers }
        });

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", areas);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get an area
// ==================================================
export const getArea = async (req: Request, res: Response) => {
    try {
        var area_id = req.params.area;

        var area = await Area.findById(area_id)
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

        if (!area) throw new Error("No se encontró el área");

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", area);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Create an area
// ==================================================
export const createArea = async (req: Request, res: Response) => {
    try {
        var body = req.body;

        var saved_area: any = await Area.create({
            name: body.name,
            organization: body.organization,
            members: [],
            responsibles: [],
            created_by: body.user
        });

        var area: any = await Area.findById(saved_area._id)
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

        getResponse(
            res,
            200,
            true,
            "",
            `El área '${saved_area.name}' se creó con éxito`,
            area
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Update an area
// ==================================================
export const updateArea = async (req: Request, res: Response) => {
    try {
        var area_id = req.params.area;
        var body = req.body;

        var area: any = {
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

        var saved_area: any = await Area.findByIdAndUpdate(area_id, area, {
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

        var client: any = clientsSocketController.getClientByUser(
            body.updated_by
        );

        var changes = [
            `El área ${body.area.name} ahora se llama ${saved_area.name}`
        ];

        var payload = {
            objectType: "area",
            object: saved_area,
            changes,
            members: saved_area.members
        };

        Server.instance.io.to(client.id).emit("update", payload);

        getResponse(
            res,
            200,
            true,
            "",
            `El área '${saved_area.name}' fue modificada con éxito`,
            saved_area
        );
    } catch (error) {
        console.error(error);
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Delete an area
// ==================================================
export const deleteArea = async (req: Request, res: Response) => {
    try {
        var area_id = req.params.area;

        var area: any = await Area.findByIdAndUpdate(
            area_id,
            {
                deleted_at: new Date()
            },
            {
                new: true
            }
        )
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

        getResponse(
            res,
            200,
            true,
            "",
            `El área '${area.name}' fue dada de baja con éxito`,
            area
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get Area Members
// ==================================================
export const getAreaMembers = async (req: Request, res: Response) => {
    try {
        var area_id = req.params.area;

        var area: any = await Area.findById(area_id);

        var members: any = await Member.find({
            _id: {
                $in: area.members
            }
        }).populate({
            path: "user",
            model: "User",
            select: "-password"
        });

        getResponse(res, 200, true, "", `La busqueda fue un éxito`, members);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Add area member
// ==================================================
export const createAreaMember = async (req: Request, res: Response) => {
    try {
        var body = req.body;

        console.log(body.updated_by);

        var find_area: any = await Area.findByIdAndUpdate(
            body.area,
            {
                $push: {
                    members: body.member._id
                },
                updated_by: body.updated_by,
                updated_at: new Date()
            },
            { new: true }
        )
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

        var client: any = clientsSocketController.getClientByUser(
            body.updated_by._id
        );

        var client_join: any = clientsSocketController.getClientByUser(
            body.member.user._id
        );

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

        Server.instance.io.to(client_join.id).emit("member-created", payload);
        Server.instance.io.to(client.id).emit("update", payload);

        getResponse(
            res,
            200,
            true,
            "",
            `El área '${body.area}' fue modificada con éxito`,
            find_area
        );
    } catch (error) {
        console.error(error);
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Delete area member
// ==================================================
export const deleteAreaMember = async (req: Request, res: Response) => {
    try {
        var body = req.body;
        var area = body.area;
        var member = body.member;
        var updated_by = body.updated_by;

        var find_area: any = await Area.findByIdAndUpdate(
            area._id,
            {
                $pull: {
                    members: member._id
                },
                updated_at: new Date(),
                updated_by: updated_by
            },
            { new: true }
        )
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

        var client: any = clientsSocketController.getClientByUser(
            updated_by._id
        );

        var client_leave: any = clientsSocketController.getClientByUser(
            member.user._id
        );

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

        Server.instance.io.to(client_leave.id).emit("member-deleted", payload);
        Server.instance.io.to(client.id).emit("update", payload);

        getResponse(
            res,
            200,
            true,
            "",
            `El área '${find_area.name}' fue modificada con éxito`,
            find_area
        );
    } catch (error) {
        console.error(error);
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
