import type { ErrorRequestHandler } from "express";

import ApiError from "../utils/ApiError.js";

const errorMiddleware: ErrorRequestHandler = (
    err,
    _req,
    res,
    _next
) => {
    console.error(err);

    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });

        return;
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};

export default errorMiddleware;