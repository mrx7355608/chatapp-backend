import mongoose from "mongoose";
import { RoomInterface, RoomUsers } from "./rooms.interfaces";
import RoomModel from "./rooms.model";
import MessageModel from "@api/messages/messages.model";

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
    const room = (await RoomModel.findById(roomid, {
        _id: 0,
        messages: { $slice: -20 },
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
): Promise<Object | null> => {
    const newUser = {
        username,
        photo,
    };
    const data = await RoomModel.findByIdAndUpdate(
        roomid,
        { $push: { users: newUser } },
        {
            new: true,
            projection: {
                name: true,
                bannedUsers: true,
                admin: true,
            },
        }
    );
    return data;
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

export const removeUsersFromRoom = async (roomid: string, username: string): Promise<RoomInterface | null> => {
    const doc = await RoomModel.findByIdAndUpdate(
        roomid,
        { $pull: { users: { username } } },
        { new: true, multi: true }
    );
     return doc;
};

export const deleteRoom = async (roomid: string): Promise<void> => {
    await RoomModel.findByIdAndDelete(roomid);
};

export const deleteRoomMessages = async (roomid: string) => {
    const res = await RoomModel.findById(roomid).populate("messages") as RoomInterface;
    if (!res || res.messages.length < 1) return;
    const messagesIds = res.messages.map(message => message._id)

    await MessageModel.deleteMany({ _id: { $in: messagesIds } })
}
