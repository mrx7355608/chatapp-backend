import { MessageInterface } from "@api/messages/messages.interfaces";

export interface ClientToServerEvents {
    "room:join": (data: Object) => void;
    "room:new-message": (message: string) => void;
}
export interface ServerToClientEvents {
    "room:new-message-received": (data: MessageInterface) => void;
    "room:new-user-joined": (data: Object) => void;
    "room:user-left": (data: Object) => void;
}
