"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const areaSocketController_1 = require("../../socketControllers/areaControllers/areaSocketController");
const areaSocketController = new areaSocketController_1.AreaSocketController();
// ==================================================
// Join to area
// ==================================================
exports.joinToArea = (socket) => {
    socket.on("join-area", payload => {
        areaSocketController.joinArea(payload, socket);
    });
};
// ==================================================
// Join to all areas
// ==================================================
exports.joinAllAreas = (socket) => {
    socket.on("join-all-areas", payload => {
        areaSocketController.joinAllAreas(payload, socket);
    });
};
// ==================================================
// Leave an area
// ==================================================
exports.leaveAnArea = (socket) => {
    socket.on("leave-area", payload => {
        areaSocketController.leaveAnArea(payload, socket);
    });
};
// ==================================================
// Leave an area
// ==================================================
exports.leaveAllAreas = (socket) => {
    socket.on("leave-all-areas", payload => {
        areaSocketController.leaveAllAreas(payload, socket);
    });
};
