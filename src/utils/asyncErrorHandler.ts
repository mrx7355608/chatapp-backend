import { Request, Response, NextFunction, RequestHandler } from "express";
import ApiError from "./ApiError";

export default (fn: Function): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) =>
        fn(req, res, next).catch((err: ApiError | Error) => next(err));
};
