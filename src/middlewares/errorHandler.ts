import { Request, Response, NextFunction } from "express";
import ApiError from "@utils/ApiError";
import config from "@config/index";

const handleCastError = (res: Response, err: ApiError | Error) => {
    return res.status(400).json({ message: err.message });
};
const handleJsonWebTokenError = (res: Response) => {
    return res.status(400).json({ message: "Un-authorized" });
};
const handleValidationError = (res: Response, err: ApiError | Error) => {
    return res.status(400).json({ message: err.message });
};
// Catch 404 errors
export const catch404 = (req: Request, res: Response, next: NextFunction) => {
    // Pass 404 error to error handler
    return next(new ApiError("Resource not found", 404));
};

// Error handler
export const errorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Development mode
    if (config.NODE_ENV === "development") {
        const code = err.statusCode || 500;
        return res
            .status(code)
            .json({ ...err, message: err.message, stack: err.stack });
    }

    // Production mode
    delete err.stack; // deleted stack for some extra safety
    const code = err.statusCode || 500;
    const message = err.message;

    if (err.isServerError) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    if (err.name === "ValidationError") return handleValidationError(res, err);
    if (err.name === "CastError") return handleCastError(res, err);
    if (err.name === "JsonWebTokenError") return handleJsonWebTokenError(res);

    return res.status(code).json({ message });
};
