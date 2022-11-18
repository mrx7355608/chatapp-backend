import { Server, Socket } from "socket.io";
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "./sockets.interfaces";

export default (
    io: Server<ClientToServerEvents, ServerToClientEvents>,
    socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {};
