import { joinRoom } from "@api/rooms/rooms.services";
import { Server, Socket } from "socket.io";
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "./sockets.interfaces";

export default (
    io: Server<ClientToServerEvents, ServerToClientEvents>,
    socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
    socket.on("room:join", async (data) => {
        // roomid
        const roomidCookie = socket.handshake.auth.rid;
        const roomid = roomidCookie.split("=")[1];
        socket.join(roomid);

        // Update room document in database
        // await joinRoom(roomid, username, photo);
    });
};
