import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/auth.types.js";

import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { env } from "../config/env.js";
import { hashToken } from "../utils/token.js";

const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
};

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) throw new ApiError(409, "User with this email already exists");

  // This project also runs with a standalone local MongoDB container.
  // A Mongo transaction requires a replica set/Atlas, so keep registration
  // compatible with both local Docker and production MongoDB.
  const user = await User.create({ username, email: normalizedEmail, password });

  try {
    await Profile.create({ user: user._id, fullName: username });
  } catch (error) {
    await User.findByIdAndDelete(user._id);
    throw error;
  }

  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) throw new ApiError(500, "Failed to create user");

  res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password +refreshToken");

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  if (!loggedInUser) throw new ApiError(500, "Failed to fetch logged in user");

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, { user: loggedInUser }, "Login successful"));
});

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");
  res.status(200).json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const incomingRefreshToken = req.cookies?.refreshToken;
  if (!incomingRefreshToken) throw new ApiError(401, "Refresh token is required");

  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(incomingRefreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;
  } catch {
    clearAuthCookies(res);
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  if (!decoded?.userId || typeof decoded.userId !== "string") {
    clearAuthCookies(res);
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await User.findById(decoded.userId).select("+refreshToken");
  if (!user || !user.refreshToken || user.refreshToken !== hashToken(incomingRefreshToken)) {
    clearAuthCookies(res);
    throw new ApiError(401, "Refresh token is expired or invalid");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, null, "Access token refreshed successfully"));
});

// Logout is intentionally idempotent. Even with an expired access token,
// the browser can clear its auth cookies.
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;
      if (decoded?.userId && typeof decoded.userId === "string") {
        await User.findByIdAndUpdate(decoded.userId, { $unset: { refreshToken: 1 } });
      }
    } catch {
      // Logout should still succeed if the token is already expired/invalid.
    }
  }

  clearAuthCookies(res);
  res.status(200).json(new ApiResponse(200, null, "Logout successful"));
});
