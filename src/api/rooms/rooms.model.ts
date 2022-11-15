import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
        password: {
            type: String,
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

// hash password
roomSchema.pre<RoomInterface>("save", async function (next) {
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
});

// validate password
roomSchema.methods.validatePassword = async function (
    inputPassword: string
): Promise<Boolean> {
    return await bcrypt.compare(inputPassword, this.password);
};
const RoomModel = mongoose.model<RoomInterface>("Room", roomSchema);

export default RoomModel;
