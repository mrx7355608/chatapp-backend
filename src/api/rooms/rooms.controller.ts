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
} from "./rooms.services";
import { createMessage } from "@api/messages/messages.services";
import ApiError from "@utils/ApiError";
import asyncErrorHandler from "@utils/asyncErrorHandler";

export default {
    httpCreateRoom: asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const userid = (req as any).user._id;
            const roomName = req.body.roomName;
            const newRoom = await createRoom(roomName, userid);
            return res.status(201).json({ data: newRoom });
        }
    ),

    httpJoinRoom: asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const roomid = req.body.roomid;
            // check if room exists
            if (!(await roomExists(roomid))) {
                return next(new ApiError("Room does not exists", 404));
            }

            // If user has already joined the room
            const roomUsers = await getRoomUsers(roomid);
            const isUser = roomUsers.filter(
                (user) => user.username === (req as any).user.username
            );
            if (isUser) {
                return next(
                    new ApiError("You have already joined the room", 400)
                );
            }

            // Add user in room
            const username = (req as any).user.username;
            const photo = (req as any).user.photo;
            await joinRoom(roomid, username, photo);
            return res.status(200).json({ data: { success: true } });
        }
    ),

    httpGetRoomData: asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const roomid = req.params.roomid;
            const room = await getRoomData(roomid);
            if (!room) {
                return next(new ApiError("Room does not exists", 404));
            }
            return res.status(200).json({ data: room });
        }
    ),

    httpGetRoomUsers: asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const roomid = req.params.roomid;
            if (!(await roomExists(roomid))) {
                return next(new ApiError("Room does not exists", 404));
            }
            const roomUsers = await getRoomUsers(roomid);
            return res.status(200).json({ data: roomUsers });
        }
    ),

    httpGetRoomMessages: asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const roomid = req.params.roomid;
            if (!(await roomExists(roomid))) {
                return next(new ApiError("Room does not exists", 404));
            }
            const roomMessages = await getRoomMessages(roomid);
            return res.status(200).json({ data: roomMessages });
        }
    ),

    httpAddMessage: asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const roomid = req.params.roomid;
            if (!(await roomExists(roomid))) {
                return next(new ApiError("Room does not exists", 404));
            }

            const messageData = {
                sender: {
                    username: (req as any).user.username,
                    photo: (req as any).user.photo,
                },
                message: req.body.message,
            };
            const newMessage = await createMessage(messageData);
            await addMessagesInRoom(roomid, newMessage._id);
            return res.status(200).json({ newMessage });
        }
    ),

    httpDeleteRoom: asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const roomid = req.params.roomid;
            const deletedDoc = await deleteRoom(roomid);
            console.log({ deletedDoc });
            return res.status(200).json({ ok: true });
        }
    ),
};
