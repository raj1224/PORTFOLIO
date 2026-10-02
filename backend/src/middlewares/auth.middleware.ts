import type { RequestHandler } from "express";

import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

import ApiError from "../utils/ApiError.js";

import User from "../models/user.model.js";

import asyncHandler from "../utils/asyncHandler.js";

import type { JwtPayload } from "../types/auth.types.js";

const verifyJWT: RequestHandler = asyncHandler(
    async (req, _res, next) => {

        const token =
            req.cookies?.accessToken ||
            req.headers.authorization?.replace(
                "Bearer ",
                ""
            );

        if (!token) {
            throw new ApiError(
                401,
                "Access token is required"
            );
        }

        let decoded: JwtPayload;

        try {
            decoded = jwt.verify(
                token,
                env.JWT_ACCESS_SECRET
            ) as JwtPayload;
        } catch {
            throw new ApiError(
                401,
                "Invalid or expired access token"
            );
        }

        const user = await User.findById(
            decoded.userId
        ).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(
                401,
                "Invalid access token"
            );
        }

        req.user = user;

        next();
    }
);

export const authorizeRoles = (
    ...allowedRoles: Array<"admin" | "user">
): RequestHandler => {

    return (req, _res, next) => {

        if (!req.user) {
            throw new ApiError(
                401,
                "Unauthorized"
            );
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw new ApiError(
                403,
                "You do not have permission to perform this action"
            );
        }

        next();
    };
};

export default verifyJWT;