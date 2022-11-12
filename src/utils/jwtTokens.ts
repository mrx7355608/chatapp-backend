import jwt, { sign } from "jsonwebtoken";
import config from "@config/index";

const createAccessTokens = (userid: string) => {
    return sign({ userid }, config.ACCESS_TOKEN_SECRET as jwt.Secret, {
        expiresIn: "10m",
    });
};
const createRefreshTokens = (userid: string) => {
    return sign({ userid }, config.REFRESH_TOKEN_SECRET as jwt.Secret, {
        expiresIn: "1d",
    });
};

export const createTokens = (userid: string) => {
    const accessToken = createAccessTokens(userid);
    const refreshToken = createRefreshTokens(userid);
    return { accessToken, refreshToken };
};
