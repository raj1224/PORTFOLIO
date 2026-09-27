import type { Request, Response } from "express";

import Profile from "../models/profile.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getMyProfile = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const profile = await Profile.findOne({
      user: req.user._id,
    }).populate("user", "-password -refreshToken");

    if (!profile) {
      throw new ApiError(404, "Profile not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        profile,
        "Profile fetched successfully"
      )
    );
  }
);

export const updateMyProfile = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const profile = await Profile.findOneAndUpdate(
      {
        user: req.user._id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
        upsert: true,
      }
    ).populate("user", "-password -refreshToken");

    if (!profile) {
      throw new ApiError(500, "Failed to update profile");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        profile,
        "Profile updated successfully"
      )
    );
  }
);