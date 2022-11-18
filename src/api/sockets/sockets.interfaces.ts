export interface ClientToServerEvents {
    "room:join": (data: Object) => void; // TODO: "data" type.
    "message:send-new-message": () => void;
}
export interface ServerToClientEvents {
    "message:new-message-received": () => void;
    "room:new-user-joined": () => void;
    "room:user-left": () => void;
}
