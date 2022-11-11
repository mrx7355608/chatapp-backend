import mongoose, { model } from "mongoose";
import { MessageInterface } from "./messages.interfaces";

const senderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
});

const messageSchema = new mongoose.Schema({
    sender: senderSchema,
    message: {
        type: String,
        required: true,
    },
});

const MessageModel = model<MessageInterface>("Message", messageSchema);

export default MessageModel;
