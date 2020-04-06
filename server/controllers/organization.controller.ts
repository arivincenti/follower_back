import Organization, { IOrganization } from "../models/organization";
import Member, { IMember } from "../models/member";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import Server from "../classes/server";
import { clientsSocketController } from "../sockets/clientsSockets/clientsSocket";
// const EmailController = require('./email.controller');
// const {
//   mailjet
// } = require('../config/config');

// ==================================================
// Get all organizations
// ==================================================
export const getOrganizations = async (req: Request, res: Response) => {
    try {
        var user_id = req.params.user;

        var userIsMember = await Member.find({
            user: user_id
        }).distinct("organization");

        var userOrganizations = await Organization.find({
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
        getResponse(
            res,
            200,
            true,
            "",
            "La búsqueda fue un éxito",
            userOrganizations
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Get an organization
// ==================================================
export const getOrganization = async (req: Request, res: Response) => {
    try {
        var organization_id = req.params.organization;

        var organization = await Organization.findById(
            organization_id
        ).populate({
            path: "created_by",
            model: "User",
            select: "-password"
        });

        getResponse(
            res,
            200,
            true,
            "",
            "La búsqueda fue un éxito",
            organization
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Create an organization
// ==================================================
export const createOrganization = async (req: Request, res: Response) => {
    try {
        var body = req.body;

        var savedOrganization = await Organization.create({
            name: body.name,
            created_by: body.user
        });

        var organization: any = await Organization.findById(
            savedOrganization._id
        ).populate({
            path: "created_by",
            model: "User",
            select: "-pasword"
        });

        // var email = `${organization.created_by.email}`;
        // var name = `${organization.created_by.name} ${organization.created_by.last_name}`;
        // var subject = `Tu organización se creó con éxito`;
        // var textPart = `Genial! Creaste a ${organization.name}, buen nombre para tu organización.`;

        // EmailController.sendEmail(email, name, subject, textPart, '');

        getResponse(
            res,
            200,
            true,
            "",
            `La organización '${organization.name}' se creó con éxito`,
            organization
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Update an organization
// ==================================================
export const updateOrganization = async (req: Request, res: Response) => {
    try {
        var organization_id = req.params.organization;
        var body = req.body;

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

        var organization_payload = {
            name: body.name,
            updated_at: new Date(),
            updated_by: body.updated_by
        };

        var organization: any = await Organization.findByIdAndUpdate(
            organization_id,
            organization_payload,
            { new: true }
        )
            .populate({
                path: "created_by",
                model: "User",
                select: "-pasword"
            })
            .populate({
                path: "updated_by",
                model: "User",
                select: "-pasword"
            });

        var changes = [
            `La organización ${body.organization.name} ahora se llama ${organization.name}`
        ];

        var client: any = clientsSocketController.getClientByUser(
            body.updated_by._id
        );

        var payload = {
            objectType: "organization",
            operationType: "update",
            object: organization,
            changes,
            members
        };

        Server.instance.io.to(client.id).emit("update", payload);

        getResponse(
            res,
            200,
            true,
            "",
            `La organización '${organization.name}' se actualizó con éxito`,
            organization
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Activate an organization
// ==================================================
export const activateOrganization = async (req: Request, res: Response) => {
    try {
        var organization_id = req.params.organization;
        var body = req.body;

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

        var organization: any = await Organization.findByIdAndUpdate(
            organization_id,
            { deleted_at: body.deleted_at, updated_by: body.updated_by },
            { new: true }
        )
            .populate({
                path: "created_by",
                model: "User",
                select: "-pasword"
            })
            .populate({
                path: "updated_by",
                model: "User",
                select: "-pasword"
            });

        var changes = [`La organización ${organization.name} se activó`];

        var client: any = clientsSocketController.getClientByUser(
            body.updated_by._id
        );

        var payload = {
            objectType: "organization",
            operationType: "update",
            object: organization,
            changes,
            members
        };

        Server.instance.io.to(client.id).emit("update", payload);

        getResponse(
            res,
            200,
            true,
            "",
            `La organización '${organization.name}' fue dada de baja con éxito`,
            organization
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Desactivate an organization
// ==================================================
export const desactivateOrganization = async (req: Request, res: Response) => {
    try {
        var organization_id = req.params.organization;
        var body = req.body;

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

        var organization: any = await Organization.findByIdAndUpdate(
            organization_id,
            { deleted_at: body.deleted_at, updated_by: body.updated_by },
            { new: true }
        )
            .populate({
                path: "created_by",
                model: "User",
                select: "-pasword"
            })
            .populate({
                path: "updated_by",
                model: "User",
                select: "-pasword"
            });

        var changes = [`La organización ${organization.name} se desactivó`];

        var client: any = clientsSocketController.getClientByUser(
            body.updated_by._id
        );

        var payload = {
            objectType: "organization",
            operationType: "update",
            object: organization,
            changes,
            members
        };

        Server.instance.io.to(client.id).emit("update", payload);

        getResponse(
            res,
            200,
            true,
            "",
            `La organización '${organization.name}' fue dada de baja con éxito`,
            organization
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
