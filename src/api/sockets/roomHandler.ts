import { deleteRoomMessages, addMessagesInRoom, deleteRoom,removeUsersFromRoom } from "@api/rooms/rooms.services";
import { createMessage } from "@api/messages/messages.services";
import { Server, Socket } from "socket.io";
import {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from "./sockets.interfaces";
import { UserInterface } from "@api/users/users.interfaces";
import {RoomInterface} from "@api/rooms/rooms.interfaces";

export default (
    io: Server<ClientToServerEvents, ServerToClientEvents>,
    socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) => {
    // Join room
    socket.on("room:join", async (data) => {
        const roomid = socket.data.roomid as string;
        const user = socket.data.user as Object;
        socket.join(roomid);
        socket.to(roomid).emit("room:new-user-joined", user);
    });

    // New message event
    socket.on("room:new-message", async (message) => {
        const roomid = socket.data.roomid as string;
        const user = socket.data.user as UserInterface;
        // Message object
        const messageData = {
            sender: {
                username: user.username,
                photo: user.photo,
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
        const roomid = socket.data.roomid as string;
        const user = socket.data.user as UserInterface;

        socket.to(roomid).emit("room:user-left", user);
        socket.leave(roomid)
        const res = await removeUsersFromRoom(roomid, user.username) as RoomInterface;
        if (res.users.length < 1) {
            deleteRoomMessages(roomid);
            deleteRoom(roomid);
            return
        }
    });
};
