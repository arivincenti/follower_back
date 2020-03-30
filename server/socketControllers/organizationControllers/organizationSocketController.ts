import { Socket } from "socket.io";

export class OrganizationSocketController {
    constructor() {}

    // ==================================================
    // Join to ticket
    // ==================================================
    joinToOrganization(payload: any, socket: Socket) {
        socket.join(payload);
        // this.countClients(payload, io);
    }

    // ==================================================
    // Join to all tickets
    // ==================================================
    joinAllOrganizations(payload: any, socket: Socket) {
        for (let organization of payload) {
            socket.join(organization._id);
        }
    }

    // ==================================================
    // Leave a ticket
    // ==================================================
    leaveAnOrganization(payload: any, socket: Socket) {
        socket.leave(payload);
    }

    // ==================================================
    // Leave a ticket
    // ==================================================
    leaveAllOrganizations(payload: any, socket: Socket) {
        for (let organization of payload) {
            socket.leave(organization._id);
        }
    }
}
