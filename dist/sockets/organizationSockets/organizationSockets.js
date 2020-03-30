"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const organizationSocketController_1 = require("../../socketControllers/organizationControllers/organizationSocketController");
const organizationSocketController = new organizationSocketController_1.OrganizationSocketController();
// ==================================================
// Join to ticket
// ==================================================
exports.joinToOrganization = (socket) => {
    socket.on("join-organization", payload => {
        organizationSocketController.joinToOrganization(payload, socket);
    });
};
// ==================================================
// Join to all tickets
// ==================================================
exports.joinAllOrganizations = (socket) => {
    socket.on("join-all-organizations", payload => {
        organizationSocketController.joinAllOrganizations(payload, socket);
    });
};
// ==================================================
// Leave a ticket
// ==================================================
exports.leaveAnOrganization = (socket) => {
    socket.on("leave-an-organization", payload => {
        organizationSocketController.leaveAnOrganization(payload, socket);
    });
};
// ==================================================
// Leave a ticket
// ==================================================
exports.leaveAllOrganizations = (socket) => {
    socket.on("leave-all-organizations", payload => {
        organizationSocketController.leaveAllOrganizations(payload, socket);
    });
};
