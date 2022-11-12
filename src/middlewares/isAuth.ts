import { TokenPayload } from "@api/auth/auth.interfaces";
import { getUser } from "@api/users/users.services";
import config from "@config/index";
import ApiError from "@utils/ApiError";
import asyncErrorHandler from "@utils/asyncErrorHandler";
import { Request, Response, NextFunction } from "express";
import jwt, { verify } from "jsonwebtoken";

export default asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        // get access token from headers
        const authorization = req.headers.authorization;
        const accessToken = authorization ? authorization.split(" ")[1] : null;
        if (!accessToken) {
            return next(new ApiError("Un-authorized", 401));
        }

        // validate access token
        const payload = verify(
            accessToken,
            config.ACCESS_TOKEN_SECRET as jwt.Secret
        ) as TokenPayload;

        // check if user still exists
        const user = await getUser({ _id: payload.userid });
        if (!user) {
            return next(new ApiError("User not found", 400));
        }

        // return response
        (req as any).user = user;
        next();
    }
);
