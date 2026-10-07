import type { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import multer from "multer";
import ApiError from "../utils/ApiError.js";

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  // Keep logs useful in development while avoiding noisy stack traces in production.
  if (process.env.NODE_ENV !== "production") console.error(err);
  else console.error(err instanceof Error ? err.message : err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ success: false, message: err.message, errors: err.errors });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(err.errors).map((error) => ({ field: error.path, message: error.message })),
    });
    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ success: false, message: `Invalid value for ${err.path}` });
    return;
  }

  if (typeof err === "object" && err !== null && "code" in err && err.code === 11000) {
    res.status(409).json({ success: false, message: "Duplicate value already exists" });
    return;
  }

  if (err instanceof multer.MulterError) {
    const message = err.code === "LIMIT_FILE_SIZE" ? "File size must not exceed 5 MB" : err.message;
    res.status(400).json({ success: false, message });
    return;
  }

  res.status(500).json({ success: false, message: "Internal Server Error" });
};

export default errorMiddleware;
