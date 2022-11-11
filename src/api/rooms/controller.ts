import { Request, Response, NextFunction } from "express";
import { createRoom, joinRoom, getRoomData, getRoomUsers } from "./services";

export default {
    httpCreateRoom: async (req: Request, res: Response, next: NextFunction) => {
        const userid = req.body.userid;
        const roomName = req.body.roomName;
        const newRoom = await createRoom(roomName, userid);
        return res.status(201).json({ data: newRoom });
    },

    httpJoinRoom: async (req: Request, res: Response, next: NextFunction) => {
        const roomid = req.body.roomid;
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
};
