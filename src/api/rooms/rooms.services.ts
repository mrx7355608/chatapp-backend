import mongoose from "mongoose";
import { RoomInterface, RoomUsers } from "./rooms.interfaces";
import RoomModel from "./rooms.model";

export const getCompleteRoomData = async (roomid: string): Promise<RoomInterface | null> => {
    const room = await RoomModel.findById(roomid);
    return room;
};
export const getRoomData = async (roomid: string): Promise<RoomInterface | null> => {
    const roomData = await RoomModel.findById(roomid, "name bannedUsers admin");
    return roomData;
};

export const getRoomUsers = async (roomid: string): Promise<Array<RoomUsers>> => {
    const room = (await RoomModel.findById(roomid, "-_id users")) as RoomInterface;
    return room.users;
};

export const getRoomMessages = async (roomid: string): Promise<Array<mongoose.Document>> => {
    const room = (await RoomModel.findById(roomid, "-_id messages", {
        $slice: -2,
    }).populate({
        path: "messages",
        select: "sender.username sender.photo message",
    })) as RoomInterface;

    return room.messages;
};

export const createRoom = async (
    roomName: string,
    roomPassword: string,
    userid: mongoose.Schema.Types.ObjectId
): Promise<RoomInterface> => {
    return await RoomModel.create({
        admin: userid,
        name: roomName,
        password: roomPassword,
    });
};

export const joinRoom = async (
    roomid: string,
    username: string,
    photo: string
): Promise<RoomInterface | null> => {
    const newUser = {
        username,
        photo,
    };
    return await RoomModel.findByIdAndUpdate(roomid, { $push: { users: newUser } }, { new: true });
};

export const roomExists = async (roomid: string): Promise<Boolean> => {
    const room = await RoomModel.findById(roomid);
    return room ? true : false;
};

export const addMessagesInRoom = async (
    roomid: string,
    messageid: mongoose.Schema.Types.ObjectId
): Promise<void> => {
    await RoomModel.findByIdAndUpdate(roomid, {
        $push: { messages: messageid },
    });
};

export const removeUsersFromRoom = async (roomid: string, username: string): Promise<void> => {
    console.log({ username });
    await RoomModel.findByIdAndUpdate(
        roomid,
        { $pull: { users: { username } } },
        { new: true, multi: true }
    );
};

export const deleteRoom = async (roomid: string): Promise<RoomInterface | null> => {
    const deleteDoc = await RoomModel.findByIdAndDelete(roomid);
    return deleteDoc;
};
