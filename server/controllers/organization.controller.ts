import Organization, { IOrganization } from "../models/organization";
import Member, { IMember } from "../models/member";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";
import Server from "../classes/server";
// const EmailController = require('./email.controller');
// const {
//   mailjet
// } = require('../config/config');

// ==================================================
// Get all organizations
// ==================================================
export const getOrganizations = async (req: Request, res: Response) => {
    try {
        //ID del usuario recibido por URL
        var user_id = req.params.user;

        // Busca los ID de las organizaciones en las que el usuario es miembro de algun Área
        // y trae valores únicos en caso de que vengan repetidas
        var userIsMember = await Member.find({
            user: user_id
        }).distinct("organization");

        //Busca las organizaciones en base a dos condiciones
        //1) El usuario puede ser dueño de la organización sin ser miembro de la misma
        //2) El usuario puede no ser dueño, pero si ser miembro, en este caso la organización a la que pertenece vendria en la variable 'userIsMember'
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

        var object: any = {
            deleted_at: body.deleted_at
        };

        if (body.name) {
            object.name = body.name;
            object.updated_at = new Date();
        }

        var savedOrganization: any = await Organization.findByIdAndUpdate(
            organization_id,
            object,
            { new: true }
        ).populate({
            path: "created_by",
            model: "User",
            select: "-pasword"
        });

        const server = Server.instance;

        server.io.emit("organization-update");

        getResponse(
            res,
            200,
            true,
            "",
            `La organización '${savedOrganization.name}' se actualizó con éxito`,
            savedOrganization
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

// ==================================================
// Delete an organization
// ==================================================
export const deleteOrganization = async (req: Request, res: Response) => {
    try {
        var organization_id = req.params.organization;

        var savedOrganization: any = await Organization.findByIdAndUpdate(
            organization_id,
            { deleted_at: new Date() },
            { new: true }
        ).populate({
            path: "created_by",
            model: "User",
            select: "-pasword"
        });

        getResponse(
            res,
            200,
            true,
            "",
            `La organización '${savedOrganization.name}' fue dada de baja con éxito`,
            savedOrganization
        );
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};
