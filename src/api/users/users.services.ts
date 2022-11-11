import UserModel from "./users.model";
import { UserInterface, UserData } from "./users.interfaces";

export const createUser = async (data: UserData): Promise<UserInterface> => {
    const newUser = await UserModel.create(data);
    return newUser;
};

export const userExists = async (username: string): Promise<Boolean> => {
    const user = await UserModel.findOne({ username });
    return user ? true : false;
};

export const getUser = async (
    filter: Object
): Promise<UserInterface | null> => {
    const user = await UserModel.findOne(filter);
    return user;
};
