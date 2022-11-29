import { addMessagesInRoom, removeUsersFromRoom } from "@api/rooms/rooms.services";
import { createMessage } from "@api/messages/messages.services";
import ApiError from "@utils/ApiError";
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./sockets.interfaces";

export default (
    io: Server<ClientToServerEvents, ServerToClientEvents>,
    socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
    // Join room
    socket.on("room:join", async (data) => {
        const { roomid } = socket as any;
        console.log(roomid);
        socket.join((socket as any).roomid);

        // emit an event to notify room members about the new user
        const user = (socket as any).user;
        socket.to((socket as any).roomid).emit("room:new-user-joined", user);
    });

    // New message event
    socket.on("room:new-message", async (message) => {
        const { roomid } = socket as any;
        // Message object
        const messageData = {
            sender: {
                username: (socket as any).user.username,
                photo: (socket as any).user.photo,
            },
            message,
        };
        // Emit event
        socket.to(roomid).emit("room:new-message-received", messageData);
        // Save message in DB
        const newMessage = await createMessage(messageData);
        // Add message in room
        await addMessagesInRoom(roomid, newMessage._id);
    });

    // Disconnect
    socket.on("disconnect", async (reason) => {
        console.log({ disconnect_reason: reason });
        const roomid = (socket as any).roomid;
        const userid = (socket as any).user._id;
        console.log({ roomid, userid });
        await removeUsersFromRoom(roomid, userid);
        socket.to((socket as any).roomid).emit("room:user-left", (socket as any).user);
    });
};
