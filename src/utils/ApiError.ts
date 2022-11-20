class ApiError extends Error {
    public message: string;
    public statusCode: number;
    public isClientError: boolean;

    constructor(message: string, statusCode: number, isClientError = true) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.isClientError = isClientError;

        // Creates a " .stack " property on given object
        Error.captureStackTrace(this);
    }
}

export default ApiError;
