import { Request, Response, NextFunction } from "express";
import { createUser, getUser, userExists } from "@api/users/users.services";
import { loginSchema, signupSchema } from "./auth.validations";
import asyncErrorHandler from "@utils/asyncErrorHandler";
import ApiError from "@utils/ApiError";

export default {
    httpLogin: asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            // Validate req.body
            await loginSchema.validateAsync(req.body);

            // Check if user exists
            const user = await getUser({ username: req.body.username }, true);
            if (!user) {
                return next(
                    new ApiError("Incorrect username or password", 400)
                );
            }

            // Validate password
            const isValidPassword = await user.isValidPassword(
                req.body.password
            );
            if (!isValidPassword) {
                return next(
                    new ApiError("Incorrect username or password", 400)
                );
            }

            // Create auth tokens

            // Send response
            return res.status(200).json({ success: true });
        }
    ),
    httpSignup: asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
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
        }
    ),
    httpLogout: async (req: Request, res: Response, next: NextFunction) => {},
    httpRefreshToken: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {},
};
