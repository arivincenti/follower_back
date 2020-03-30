"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrganizationSocketController {
    constructor() { }
    // ==================================================
    // Join to ticket
    // ==================================================
    joinToOrganization(payload, socket) {
        socket.join(payload);
        // this.countClients(payload, io);
    }
    // ==================================================
    // Join to all tickets
    // ==================================================
    joinAllOrganizations(payload, socket) {
        for (let organization of payload) {
            socket.join(organization._id);
        }
    }
    // ==================================================
    // Leave a ticket
    // ==================================================
    leaveAnOrganization(payload, socket) {
        socket.leave(payload);
    }
    // ==================================================
    // Leave a ticket
    // ==================================================
    leaveAllOrganizations(payload, socket) {
        for (let organization of payload) {
            socket.leave(organization._id);
        }
    }
}
exports.OrganizationSocketController = OrganizationSocketController;
