import Area, { IArea } from "../models/area";
import Member, { IMember } from "../models/member";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import { clientsSocketController } from "../sockets/clientsSockets/clientsSocket";
import Server from "../classes/server";
import { createNotification } from "../socketControllers/notificationControllers/notificationSocketController";
import { IUser } from "../models/user";

// ==================================================
// Get all areas
// ==================================================
export const getAreas = async (req: Request, res: Response) => {
    try {
        var organization_id = req.params.organization;

        var areas = await Area.find({
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
            user: user,
        });

        var areas = await Area.find({
            members: { $in: memers },
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
            created_by: body.user,
        });

        var area: any = await Area.findById(saved_area._id)
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

        createNotification(payload);

        getResponse(
            res,
            200,
            true,
            "",
            `El área '${area.name}' se creó con éxito`,
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
            updated_at: new Date(),
        };

        var saved_area: any = await Area.findByIdAndUpdate(area_id, area, {
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

        let users = await saved_area.members.map(
            (member: IMember) => member.user
        );

        const payload = {
            objectType: "area",
            object: saved_area,
            operationType: "update",
            changes,
            users,
            created_by: body.updated_by,
        };

        createNotification(payload);

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
// Activate area
// ==================================================
export const activateArea = async (req: Request, res: Response) => {
    try {
        const area_id = req.params.area;
        const body = req.body;

        const area: any = await Area.findByIdAndUpdate(
            area_id,
            {
                deleted_at: undefined,
                updated_by: body.updated_by,
            },
            {
                new: true,
            }
        )
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

        let users = await area.members.map((member: IMember) => member.user);

        const payload = {
            objectType: "area",
            object: area,
            operationType: "update",
            changes,
            users,
            created_by: body.updated_by,
        };

        createNotification(payload);

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
// Desactivate an area
// ==================================================
export const desactivateArea = async (req: Request, res: Response) => {
    try {
        const area_id = req.params.area;
        const body = req.body;

        const area: any = await Area.findByIdAndUpdate(
            area_id,
            {
                deleted_at: new Date(),
                updated_by: body.updated_by,
            },
            {
                new: true,
            }
        )
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

        let users = await area.members.map((member: IMember) => member.user);

        const payload = {
            objectType: "area",
            object: area,
            operationType: "update",
            changes,
            users,
            created_by: body.updated_by,
        };

        createNotification(payload);

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
                $in: area.members,
            },
        }).populate({
            path: "user",
            model: "User",
            select: "-password",
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

        const find_area: any = await Area.findByIdAndUpdate(
            body.area,
            {
                $push: {
                    members: body.member._id,
                },
                updated_by: body.updated_by,
                updated_at: new Date(),
            },
            { new: true }
        )
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

        const clientJoin: any = clientsSocketController.getClientByUser(
            body.member.user._id
        );

        const changes = [
            `"${body.member.user.name} ${body.member.user.last_name}" ahora es miembro del área "${find_area.name}"`,
        ];

        let users = await find_area.members.map(
            (member: IMember) => member.user
        );

        const payload = {
            memberCreated: body.member,
            objectType: "area",
            operationType: "update",
            object: find_area,
            changes,
            users,
            created_by: body.updated_by,
        };

        createNotification(payload);

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
                    members: member._id,
                },
                updated_at: new Date(),
                updated_by: updated_by,
            },
            { new: true }
        )
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

        const clientLeave: any = clientsSocketController.getClientByUser(
            body.member.user._id
        );

        var changes = [
            `El miembro "${body.member.user.name} ${body.member.user.last_name}" fue eliminado del área "${find_area.name}"`,
        ];

        let users = await body.area.members.map(
            (member: IMember) => member.user
        );

        const payload = {
            memberDeleted: member,
            objectType: "area",
            operationType: "update",
            object: find_area,
            changes,
            users,
            created_by: body.updated_by,
        };

        createNotification(payload);

        if (clientLeave !== null) {
            Server.instance.io
                .to(clientLeave.id)
                .emit("member-deleted", payload);
        }

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

// ==================================================
// Update an area
// ==================================================
export const setResponsibleAreaMember = async (req: Request, res: Response) => {
    try {
        const area_id = req.params.area;
        const body = req.body;
        let responsible = null;

        if (body.responsible) {
            if (body.area.responsible) {
                if (
                    String(body.area.responsible._id) !== body.responsible._id
                ) {
                    responsible = body.responsible;
                } else {
                    responsible = undefined;
                }
            } else {
                responsible = body.responsible;
            }
        }

        var saved_area: any = await Area.findByIdAndUpdate(
            area_id,
            { responsible },
            {
                new: true,
            }
        )
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

        var client: any = clientsSocketController.getClientByUser(
            body.updated_by
        );

        var changes: string[] = [];

        if (responsible !== undefined) {
            changes.push(
                `Se asignó a "${body.responsible.user.name} ${body.responsible.user.last_name}" como miembro responsable del área "${body.area.name}"`
            );
        } else {
            changes.push(
                `El miembro "${body.responsible.user.name} ${body.responsible.user.last_name}" se quitó como responsable del área "${body.area.name}"`
            );
        }

        var payload = {
            objectType: "area",
            operationType: "update",
            object: saved_area,
            changes,
            members: saved_area.members,
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
