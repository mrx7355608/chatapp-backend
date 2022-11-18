import { Server } from "socket.io";
import messageHandler from "@api/sockets/messageHandler";
import { Server as HttpServer } from "http";
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "@api/sockets/sockets.interfaces";

const setupSocketServer = (httpServer: HttpServer) => {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(
        httpServer,
        {
            cors: {
                origin: "http://localhost:5173",
            },
        }
    );
    io.on("connection", (socket) => {
        messageHandler(io, socket);
    });
};

export default setupSocketServer;
