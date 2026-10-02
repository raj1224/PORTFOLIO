import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/auth.types.js";

import mongoose from "mongoose";

import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
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

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      throw new ApiError(
        409,
        "User with this email already exists"
      );
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const users = await User.create(
        [
          {
            username,
            email,
            password,
          },
        ],
        { session }
      );

      const user = users[0];

      await Profile.create(
        [
          {
            user: user._id,
            fullName: username,
          },
        ],
        { session }
      );

      await session.commitTransaction();

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
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(
        401,
        "Invalid email or password"
      );
    }

    // 2. Check password
    const isPasswordCorrect =
      await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new ApiError(
        401,
        "Invalid email or password"
      );
    }

    // 3. Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // 4. Save refresh token in database
    user.refreshToken = refreshToken;
    await user.save();

    // 5. Get safe user data
    const loggedInUser = await User.findById(user._id)
      .select("-password -refreshToken");

    if (!loggedInUser) {
      throw new ApiError(
        500,
        "Failed to fetch logged in user"
      );
    }

    // 6. Cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    };

    // 7. Send response
    res
      .status(200)
      .cookie(
        "accessToken",
        accessToken,
        cookieOptions
      )
      .cookie(
        "refreshToken",
        refreshToken,
        cookieOptions
      )
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

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        req.user,
        "Current user fetched successfully"
      )
    );
  }
);

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    // 1. Get refresh token from cookie
    const incomingRefreshToken =
      req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(
        401,
        "Refresh token is required"
      );
    }

    // 2. Verify refresh token
    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(
        incomingRefreshToken,
        env.JWT_REFRESH_SECRET
      ) as JwtPayload;
    } catch {
      throw new ApiError(
        401,
        "Invalid or expired refresh token"
      );
    }

    // 3. Find user
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(
        401,
        "Invalid refresh token"
      );
    }

    // 4. Compare token with DB token
    if (
      user.refreshToken !==
      incomingRefreshToken
    ) {
      throw new ApiError(
        401,
        "Refresh token is expired or invalid"
      );
    }

    // 5. Generate new tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // 6. Rotate refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // 7. Cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    };

    // 8. Send new tokens
    res
      .status(200)
      .cookie(
        "accessToken",
        accessToken,
        cookieOptions
      )
      .cookie(
        "refreshToken",
        refreshToken,
        cookieOptions
      )
      .json(
        new ApiResponse(
          200,
          null,
          "Access token refreshed successfully"
        )
      );
  }
);
export const logoutUser = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(
        401,
        "Unauthorized"
      );
    }

    // 1. Remove refresh token from database
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      }
    );

    // 2. Same options used while creating cookies
    const cookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    };

    // 3. Clear cookies
    res
      .clearCookie(
        "accessToken",
        cookieOptions
      )
      .clearCookie(
        "refreshToken",
        cookieOptions
      )
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Logout successful"
        )
      );
  }
);