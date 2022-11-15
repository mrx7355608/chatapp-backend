import joi from "joi";

const createRoomSchema = joi.object({
    roomName: joi.string().min(4).required().messages({
        "any.required": "Room name is missing",
        "string.base": "Enter a valid room name",
        "string.empty": "Room name cannot be empty",
        "string.min": "Room name should be 4 characters long at least",
        "string.max": "Room name should not be longer than 50 characters",
    }),
    roomPassword: joi.string().min(10).required().messages({
        "any.required": "Room cannot be created without password",
        "string.base": "Enter a valid room password",
        "string.empty": "Room password cannot be empty",
        "string.min": "Room password should be 10 characters long at least",
    }),
});
const joinRoomSchema = joi.object({
    roomid: joi.string().required().messages({
        "any.required": "RoomID is missing",
        "string.base": "Enter a valid RoomID",
        "string.empty": "RoomID cannot be empty",
    }),
    roomPassword: joi.string().required().messages({
        "any.required": "Room password is missing",
        "string.base": "Enter a valid room password",
        "string.empty": "Room password cannot be empty",
    }),
});
export { createRoomSchema, joinRoomSchema };
