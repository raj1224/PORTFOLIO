import type { Request, Response } from "express";

import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/jwt.js";

import { env } from "../config/env.js";

export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const {
            username,
            email,
            password,
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            email,
        });

        if (existingUser) {
            throw new ApiError(
                409,
                "User with this email already exists"
            );
        }

        const user = await User.create({
    username,
    email,
    password,
});

        // Don't send password to client
        const createdUser = await User.findById(
            user._id
        ).select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(
                500,
                "Failed to create user"
            );
        }

        res.status(201).json(
            new ApiResponse(
                201,
                createdUser,
                "User registered successfully"
            )
        );
    }
);

export const loginUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(
                401,
                "Invalid email or password"
            );
        }

        const isPasswordCorrect =
            await user.comparePassword(password);

        if (!isPasswordCorrect) {
            throw new ApiError(
                401,
                "Invalid email or password"
            );
        }

        const accessToken =
            generateAccessToken(user);

        const refreshToken =
            generateRefreshToken(user);

        user.refreshToken = refreshToken;

        await user.save();

        const loggedInUser =
            await User.findById(user._id)
                .select("-password -refreshToken");

        res
            .status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "lax",
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "lax",
            })
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser,
                    },
                    "Login successful"
                )
            );
    }
);