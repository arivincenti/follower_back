"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AreaSocketController {
    constructor() { }
    // ==================================================
    // Join to one area
    // ==================================================
    joinArea(payload, socket) {
        socket.join(payload);
    }
    // ==================================================
    // Join to all areas
    // ==================================================
    joinAllAreas(payload, socket) {
        for (let area of payload) {
            socket.join(area._id);
        }
    }
    // ==================================================
    // Leave an area
    // ==================================================
    leaveAnArea(payload, socket) {
        socket.leave(payload);
    }
    // ==================================================
    // Leave to all areas
    // ==================================================
    leaveAllAreas(payload, socket) {
        for (let area of payload) {
            socket.leave(area._id);
        }
    }
}
exports.AreaSocketController = AreaSocketController;
