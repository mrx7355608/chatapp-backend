import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { ClientToServerEvents, ServerToClientEvents } from "@api/sockets/sockets.interfaces";
import { TokenPayload } from "@api/auth/auth.interfaces";
import { getUser } from "@api/users/users.services";
import jwt, { verify } from "jsonwebtoken";
import ApiError from "@utils/ApiError";
import roomHandler from "@api/sockets/roomHandler";

const setupSocketServer = (httpServer: HttpServer) => {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
        cors: {
            origin: "http://localhost:5173",
        },
    });

    // Validate connection
    io.use(async (socket, next) => {
        // Extract access token from handshake
        const { token } = socket.handshake.auth;
        if (!token) return next(new ApiError("Un-authorized socket connection", 401));

        // Verify access token
        let payload;
        try {
            payload = verify(token, process.env.ACCESS_TOKEN_SECRET as jwt.Secret, {
                audience: "ca",
                algorithms: ["HS256"],
            }) as TokenPayload;
        } catch (err: any) {
            return next(new ApiError(err.message, 401));
        }

        // Get user data
        const user = await getUser({ _id: payload.id });
        (socket as any).user = user;
        next();
    });

    // Create a "roomid" prop on socket object
    io.use((socket, next) => {
        const { roomid } = socket.handshake.auth;
        console.log({ ROOMID: roomid });
        if (!roomid) {
            console.log("err");
            return next(new ApiError("Roomid missing", 401));
        }
        (socket as any).roomid = roomid;
        next();
    });

    io.on("connection", (socket) => {
        console.log(`[INFO] NEW CONNECTION ${socket.id}`);
        console.log;
        roomHandler(io, socket);
    });
};

export default setupSocketServer;
