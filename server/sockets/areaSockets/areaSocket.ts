import { Socket } from "socket.io";
import { AreaSocketController } from "../../socketControllers/areaControllers/areaSocketController";

const areaSocketController = new AreaSocketController();

// ==================================================
// Join to area
// ==================================================
export const joinToArea = (socket: Socket) => {
    socket.on("join-area", payload => {
        areaSocketController.joinArea(payload, socket);
    });
};

// ==================================================
// Join to all areas
// ==================================================
export const joinAllAreas = (socket: Socket) => {
    socket.on("join-all-areas", payload => {
        areaSocketController.joinAllAreas(payload, socket);
    });
};

// ==================================================
// Leave an area
// ==================================================
export const leaveAnArea = (socket: Socket) => {
    socket.on("leave-area", payload => {
        areaSocketController.leaveAnArea(payload, socket);
    });
};

// ==================================================
// Leave an area
// ==================================================
export const leaveAllAreas = (socket: Socket) => {
    socket.on("leave-all-areas", payload => {
        areaSocketController.leaveAllAreas(payload, socket);
    });
};
