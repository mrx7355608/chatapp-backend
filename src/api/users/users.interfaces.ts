import { Document } from "mongoose";

export interface UserData {
    fname: string;
    lname: string;
    username: string;
    password: string;
}

export interface UserInterface extends UserData, Document {
    photo: string;
    fullname: string;
    tokenVersion: string;
    createdAt: Date;
    updatedAt: Date;

    isValidPassword(password: string): Promise<Boolean>;
}
