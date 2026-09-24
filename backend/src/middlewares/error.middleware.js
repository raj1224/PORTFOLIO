import { env } from "../config/env.js";

export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
};

export const errorHandler = (
    error,
    req,
    res,
    next
) => {
    console.error(error);

    const statusCode = error.statusCode || 500;

    const message =
        statusCode === 500 &&
        env.NODE_ENV === "production"
            ? "Internal server error"
            : error.message || "Internal server error";

    res.status(statusCode).json({
        success: false,
        message,

        ...(error.errors?.length && {
            errors: error.errors,
        }),

        ...(env.NODE_ENV === "development" && {
            stack: error.stack,
        }),
    });
};