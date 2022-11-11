import mongoose from "mongoose";
import { RoomInterface, RoomUsers } from "./interfaces";
import RoomModel from "./model";

export const getRoomData = async (
    roomid: string
): Promise<RoomInterface | null> => {
    const roomData = await RoomModel.findById(roomid, "name bannedUsers admin");
    return roomData;
};

export const getRoomUsers = async (
    roomid: string
): Promise<Array<RoomUsers>> => {
    const roomUsers = (await RoomModel.findById(
        roomid,
        "users"
    )) as Array<RoomUsers>;
    return roomUsers;
};

export const getRoomMessages = async (
    roomid: string
): Promise<Array<mongoose.Document>> => {
    const roomMessages = (await RoomModel.findById(roomid, "messages", {
        $slice: -20,
    }).populate("messages")) as Array<mongoose.Document>;

    return roomMessages;
};

export const createRoom = async (
    roomName: string,
    userid: mongoose.Schema.Types.ObjectId
): Promise<RoomInterface> => {
    return await RoomModel.create({ admin: userid, name: roomName });
};

export const joinRoom = async (
    roomid: string,
    username: string,
    photo: string
): Promise<void> => {
    const newUser = {
        username,
        photo,
    };
    await RoomModel.findByIdAndUpdate(roomid, { $push: { users: newUser } });
};

export const removeUsersFromRoom = () => {};
export const addMessagesInRoom = () => {};
export const deleteRoom = () => {};
