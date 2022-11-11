import { Request, Response, NextFunction } from "express";
import {
    createRoom,
    joinRoom,
    getRoomData,
    getRoomUsers,
    getRoomMessages,
    deleteRoom,
    addMessagesInRoom,
} from "./rooms.services";
import { createMessage } from "@api/messages/messages.services";

export default {
    httpCreateRoom: async (req: Request, res: Response, next: NextFunction) => {
        // Userid will be taken from the req.user object
        // Modify it after adding authentication
        const userid = req.body.userid;
        const roomName = req.body.roomName;
        const newRoom = await createRoom(roomName, userid);
        return res.status(201).json({ data: newRoom });
    },

    httpJoinRoom: async (req: Request, res: Response, next: NextFunction) => {
        const roomid = req.body.roomid;
        // Remove this after adding authentication
        // username and photo will be extracted from req.user
        const username = req.body.username;
        const photo = req.body.photo;
        await joinRoom(roomid, username, photo);
        return res.status(200).json({ data: { success: true } });
    },

    httpGetRoomData: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const roomid = req.params.roomid;
        const roomData = await getRoomData(roomid);
        return res.status(200).json({ data: roomData });
    },

    httpGetRoomUsers: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const roomid = req.params.roomid;
        const roomUsers = await getRoomUsers(roomid);
        return res.status(200).json({ data: roomUsers });
    },

    httpGetRoomMessages: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const roomid = req.params.roomid;
        const roomMessages = await getRoomMessages(roomid);
        return res.status(200).json({ data: roomMessages });
    },

    httpAddMessage: async (req: Request, res: Response, next: NextFunction) => {
        const roomid = req.params.roomid;
        const messageData = {
            sender: {
                username: req.body.sender.username,
                photo: req.body.sender.photo,
            },
            message: req.body.message,
        };
        const newMessage = await createMessage(messageData);
        await addMessagesInRoom(roomid, newMessage._id);
        return res.status(200).json({ newMessage });
    },

    httpDeleteRoom: async (req: Request, res: Response, next: NextFunction) => {
        const roomid = req.params.roomid;
        const deletedDoc = await deleteRoom(roomid);
        console.log({ deletedDoc });
        return res.status(200).json({ ok: true });
    },
};
