import mongoose from "mongoose";

export interface RoomUsers extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
    photo: string;
}

export interface RoomInterface extends mongoose.Document {
    name: string;
    users: RoomUsers[];
    bannedUsers: string[];
    messages: mongoose.Schema.Types.ObjectId[];
    admin: mongoose.Schema.Types.ObjectId;
}
