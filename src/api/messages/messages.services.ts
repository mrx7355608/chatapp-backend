import { MessageInterface } from "./messages.interfaces";
import MessageModel from "./messages.model";
import { Document } from "mongoose";

export const createMessage = async (
    messageData: MessageInterface
): Promise<Document> => {
    console.log({ messageData });
    const newMessage = await MessageModel.create(messageData);
    return newMessage;
};
