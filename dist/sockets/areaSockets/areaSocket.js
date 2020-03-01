"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinArea = (socket, io) => {
    socket.on("join-area", payload => {
        socket.join(payload);
    });
};
exports.joinAllAreas = (socket, io) => {
    socket.on("join-all-areas", payload => {
        for (let area of payload) {
            socket.join(area._id);
        }
    });
};
exports.leaveArea = (socket, io) => {
    socket.on("leave-area", payload => {
        socket.leave(payload);
    });
};
