import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import multer from "multer";
import  ApiError  from "../utils/ApiError.js";

const errorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  console.error(err);

  // Our custom API error
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });

    return;
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(err.errors).map((error) => ({
        field: error.path,
        message: error.message,
      })),
    });

    return;
  }

  // Mongoose CastError
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: `Invalid value for ${err.path}`,
    });

    return;
  }

  // Duplicate MongoDB field
  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    err.code === 11000
  ) {
    res.status(409).json({
      success: false,
      message: "Duplicate value already exists",
    });

    return;
  }

  // Multer errors
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      success: false,
      message: err.message,
    });

    return;
  }

  // Unknown error
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;