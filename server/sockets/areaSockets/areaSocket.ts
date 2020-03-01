import { Socket } from "socket.io";

export const joinArea = (socket: Socket, io: SocketIO.Server) => {
    socket.on("join-area", payload => {
        socket.join(payload);
    });
};

export const joinAllAreas = (socket: Socket, io: SocketIO.Server) => {
    socket.on("join-all-areas", payload => {
        for (let area of payload) {
            socket.join(area._id);
        }
    });
};

export const leaveArea = (socket: Socket, io: SocketIO.Server) => {
    socket.on("leave-area", payload => {
        socket.leave(payload);
    });
};
