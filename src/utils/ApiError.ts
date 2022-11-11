class ApiError extends Error {
    public message: string;
    public statusCode: number;
    public isServerError: boolean;

    constructor(message: string, statusCode: number, isServerError = false) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.isServerError = isServerError;

        // Creates a " .stack " property on given object
        Error.captureStackTrace(this);
    }
}

export default ApiError;
