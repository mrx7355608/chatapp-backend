import { getUser } from "./users.services";
import asyncErrorHandler from "@utils/asyncErrorHandler";
import ApiError from "@utils/ApiError";
import { Request, Response, NextFunction } from "express";

export default {
    httpGetUser: asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userid = (req as any).user._id;
        const user = await getUser({ _id: userid });
        if (!user) {
            return next(new ApiError("User does not exists anymore", 400));
        }

        return res.status(200).json({ data: user });
    }),
};
