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
    filter: Object,
    includePassword = false
): Promise<UserInterface | null> => {
    let user;
    if (includePassword) {
        user = await UserModel.findOne(filter, "+password");
    } else {
        user = await UserModel.findOne(filter, "-createdAt -updatedAt -__v -tokenVersion");
    }
    return user;
};
