import { Socket } from "socket.io";

export class AreaSocketController {
    constructor() {}

    // ==================================================
    // Join to one area
    // ==================================================
    joinArea(payload: any, socket: Socket) {
        socket.join(payload);
    }

    // ==================================================
    // Join to all areas
    // ==================================================
    joinAllAreas(payload: any, socket: Socket) {
        for (let area of payload) {
            socket.join(area._id);
        }
    }

    // ==================================================
    // Leave an area
    // ==================================================
    leaveAnArea(payload: any, socket: Socket) {
        socket.leave(payload);
    }
}
