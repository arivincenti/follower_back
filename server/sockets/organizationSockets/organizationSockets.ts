import { Socket } from "socket.io";
import { OrganizationSocketController } from "../../socketControllers/organizationControllers/organizationSocketController";

const organizationSocketController = new OrganizationSocketController();

// ==================================================
// Join to ticket
// ==================================================
export const joinToOrganization = (socket: Socket) => {
    socket.on("join-organization", payload => {
        organizationSocketController.joinToOrganization(payload, socket);
    });
};

// ==================================================
// Join to all tickets
// ==================================================
export const joinAllOrganizations = (socket: Socket) => {
    socket.on("join-all-organizations", payload => {
        organizationSocketController.joinAllOrganizations(payload, socket);
    });
};

// ==================================================
// Leave a ticket
// ==================================================
export const leaveAnOrganization = (socket: Socket) => {
    socket.on("leave-an-organization", payload => {
        organizationSocketController.leaveAnOrganization(payload, socket);
    });
};

// ==================================================
// Leave a ticket
// ==================================================
export const leaveAllOrganizations = (socket: Socket) => {
    socket.on("leave-all-organizations", payload => {
        organizationSocketController.leaveAllOrganizations(payload, socket);
    });
};
