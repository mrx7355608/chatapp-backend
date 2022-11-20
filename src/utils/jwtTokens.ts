import jwt, { sign } from "jsonwebtoken";
import config from "@config/index";
import { UserInterface } from "@api/users/users.interfaces";

const createAccessTokens = (userid: string) => {
    return sign({ id: userid }, config.ACCESS_TOKEN_SECRET as jwt.Secret, {
        expiresIn: "10m",
        audience: "ca",
    });
};
const createRefreshTokens = (userid: string) => {
    return sign({ id: userid }, config.REFRESH_TOKEN_SECRET as jwt.Secret, {
        expiresIn: "1d",
    });
};

export const createTokens = (userid: string) => {
    const accessToken = createAccessTokens(userid);
    const refreshToken = createRefreshTokens(userid);
    return { accessToken, refreshToken };
};
