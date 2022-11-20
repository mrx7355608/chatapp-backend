import { Request, Response, NextFunction } from "express";
import { createUser, getUser, userExists } from "@api/users/users.services";
import { loginSchema, signupSchema } from "./auth.validations";
import asyncErrorHandler from "@utils/asyncErrorHandler";
import ApiError from "@utils/ApiError";
import { createTokens } from "@utils/jwtTokens";
import jwt, { verify } from "jsonwebtoken";
import config from "@config/index";
import { TokenPayload } from "./auth.interfaces";

export default {
    httpLogin: asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Validate req.body
        await loginSchema.validateAsync(req.body);

        // Check if user exists
        const user = await getUser({ username: req.body.username }, true);
        if (!user) {
            return next(new ApiError("Incorrect username or password", 400));
        }

        // Validate password
        const isValidPassword = await user.isValidPassword(req.body.password);
        if (!isValidPassword) {
            return next(new ApiError("Incorrect username or password", 400));
        }

        // Create auth tokens
        const { accessToken, refreshToken } = createTokens(user);

        // Send response
        const cookieOptions = {
            httpOnly: true,
            path: "/auth/refresh-token",
        };
        res.cookie("rt", refreshToken, cookieOptions);
        return res.status(200).json({ success: true, accessToken });
    }),

    httpSignup: asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Validate req.body
        await signupSchema.validateAsync(req.body);
        // Check if user exists
        if (await userExists(req.body.username)) {
            return next(new ApiError("Username already taken.", 400));
        }
        // create a new user
        await createUser(req.body);
        // return response
        return res.status(201).json({ success: true });
    }),

    httpLogout: asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
        res.clearCookie("rt");
        return res.status(200).json({ success: true });
    }),

    httpRefreshToken: asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
        // check if there's a refresh token cookie
        const refreshTokenCookie = req.cookies.rt;
        if (!refreshTokenCookie) {
            return res.status(200).json({ ok: true, accessToken: "" });
        }

        // validate refresh token
        const payload = verify(
            refreshTokenCookie,
            config.REFRESH_TOKEN_SECRET as jwt.Secret
        ) as TokenPayload;

        // Check if the user still exists
        const user = await getUser({ _id: payload.id });
        if (!user) {
            return res.status(200).json({ ok: true, accessToken: "" });
        }

        // Check if token is not revoked
        if (payload.v !== user.tokenVersion) {
            return res.status(200).json({ ok: true, accessToken: "" });
        }

        // create new access and refresh tokens
        const { accessToken, refreshToken } = createTokens(user);

        // Send response
        const cookieOptions = {
            httpOnly: true,
        };
        res.cookie("rt", refreshToken, cookieOptions);
        return res.status(200).json({ success: true, accessToken });
    }),

    httpForgotPassword: asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            // Send email containing a reset password token
        }
    ),

    httpResetPassword: asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            // Verify token
            // Change token version in DB
            // Reset user's password
        }
    ),
};
