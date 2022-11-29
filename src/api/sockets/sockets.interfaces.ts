import { MessageInterface } from "@api/messages/messages.interfaces";
import { UserInterface } from "@api/users/users.interfaces";
import mongoose from "mongoose";

export interface ClientToServerEvents {
    "room:join": (data: Object) => void;
    "room:new-message": (message: string) => void;
}
export interface ServerToClientEvents {
    "room:new-message-received": (data: MessageInterface) => void;
    "room:new-user-joined": (data: Object) => void;
    "room:user-left": (data: Object) => void;
}
export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    roomid: string;
    user: UserInterface | null;
}
