import jwt, { sign } from "jsonwebtoken";
import config from "@config/index";
import { UserInterface } from "@api/users/users.interfaces";

const createAccessTokens = (user: UserInterface) => {
    return sign({ id: user._id }, config.ACCESS_TOKEN_SECRET as jwt.Secret, {
        expiresIn: "10m",
        audience: "ca",
    });
};
const createRefreshTokens = (user: UserInterface) => {
    return sign(
        { id: user._id, v: user.tokenVersion },
        config.REFRESH_TOKEN_SECRET as jwt.Secret,
        {
            expiresIn: "1d",
        }
    );
};

export const createTokens = (user: UserInterface) => {
    const accessToken = createAccessTokens(user);
    const refreshToken = createRefreshTokens(user);
    return { accessToken, refreshToken };
};
