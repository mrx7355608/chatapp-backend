import { Request, Response, NextFunction } from "express";
import {
    createRoom,
    joinRoom,
    getRoomData,
    getRoomUsers,
    getRoomMessages,
    deleteRoom,
    addMessagesInRoom,
    roomExists,
    getCompleteRoomData,
} from "./rooms.services";
import { createMessage } from "@api/messages/messages.services";
import ApiError from "@utils/ApiError";
import asyncErrorHandler from "@utils/asyncErrorHandler";
import { createRoomSchema, joinRoomSchema } from "./rooms.validations";

const sendResponse = (res: Response, statusCode: number, data: Object) => {
    res.status(statusCode).json({ data });
};

export default {
    httpCreateRoom: asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
        // validate user input
        await createRoomSchema.validateAsync(req.body);

        // Create room
        const userid = (req as any).user._id;
        const roomName = req.body.roomName;
        const roomPassword = req.body.roomPassword;
        const newRoom = await createRoom(roomName, roomPassword, userid);

        // return response
        return sendResponse(res, 201, { roomid: newRoom._id });
    }),

    httpJoinRoom: asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
        // validate user input
        await joinRoomSchema.validateAsync(req.body);

        const roomid = req.body.roomid;
        const roomPassword = req.body.roomPassword;

        const room = await getCompleteRoomData(roomid);
        // check if room exists
        if (!room) {
            return next(new ApiError("Room is not active anymore", 400));
        }
        // validate password
        const isValidPassword = await room.validatePassword(roomPassword);
        if (!isValidPassword) {
            return next(new ApiError("Incorrect room password", 400));
        }

        // Add user in room
        const username = (req as any).user.username;
        const photo = (req as any).user.photo;
        const updateRoomData = await joinRoom(roomid, username, photo);

        return sendResponse(res, 200, { room: updateRoomData });
    }),

    httpGetRoomData: asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
        const roomid = req.params.roomid;
        const room = await getRoomData(roomid);
        if (!room) {
            return next(new ApiError("Room does not exists", 404));
        }
        return sendResponse(res, 200, { room });
    }),

    httpGetRoomUsers: asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
        const roomid = req.params.roomid;
        if (!(await roomExists(roomid))) {
            return next(new ApiError("Room does not exists", 404));
        }
        const roomUsers = await getRoomUsers(roomid);
        return sendResponse(res, 200, roomUsers);
    }),

    httpGetRoomMessages: asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const roomid = req.params.roomid;
            if (!(await roomExists(roomid))) {
                return next(new ApiError("Room does not exists", 404));
            }
            const roomMessages = await getRoomMessages(roomid);
            return sendResponse(res, 200, roomMessages);
        }
    ),
};
