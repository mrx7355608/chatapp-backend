import { Request, Response, NextFunction } from "express";

export default {
    httpLogin: async (req: Request, res: Response, next: NextFunction) => {},
    httpSignup: async (req: Request, res: Response, next: NextFunction) => {},
    httpLogout: async (req: Request, res: Response, next: NextFunction) => {},
    httpRefreshToken: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {},
};
