import mongoose from "mongoose";
import { RoomInterface } from "./rooms.interfaces";

const roomUsersSchema = new mongoose.Schema({
    username: String,
    photo: String,
});

const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        users: {
            type: [roomUsersSchema],
            default: [],
        },
        bannedUsers: {
            type: [String],
            default: [],
        },
        messages: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Message",
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

const RoomModel = mongoose.model<RoomInterface>("Room", roomSchema);

export default RoomModel;
