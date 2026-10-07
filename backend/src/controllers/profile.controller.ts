import type { Request, Response } from "express";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import Profile from "../models/profile.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");
  const profile = await Profile.findOne({ user: req.user._id }).populate("user", "-password -refreshToken");
  if (!profile) throw new ApiError(404, "Profile not found");
  res.status(200).json(new ApiResponse(200, profile, "Profile fetched successfully"));
});

export const updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");
  const profile = await Profile.findOneAndUpdate(
    { user: req.user._id },
    { $set: req.body },
    { new: true, runValidators: true }
  ).populate("user", "-password -refreshToken");
  if (!profile) throw new ApiError(404, "Profile not found");
  res.status(200).json(new ApiResponse(200, profile, "Profile updated successfully"));
});

export const uploadAvatar = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");
  if (!req.file) throw new ApiError(400, "Avatar file is required");

  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) throw new ApiError(404, "Profile not found");

  const oldPublicId = profile.avatar.publicId;
  const uploaded = await uploadToCloudinary(req.file.buffer, "raj-portfolio/profile", "image");
  const newAvatar = { url: uploaded.secure_url, publicId: uploaded.public_id };

  try {
    profile.avatar = newAvatar;
    await profile.save();
  } catch (error) {
    await deleteFromCloudinary(newAvatar.publicId, "image");
    throw error;
  }

  if (oldPublicId) await deleteFromCloudinary(oldPublicId, "image");
  res.status(200).json(new ApiResponse(200, profile, "Avatar uploaded successfully"));
});

export const uploadResume = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");
  if (!req.file) throw new ApiError(400, "Resume file is required");

  const profile = await Profile.findOne({ user: req.user._id });
  if (!profile) throw new ApiError(404, "Profile not found");

  const oldPublicId = profile.resumeUrl.publicId;
  const uploaded = await uploadToCloudinary(req.file.buffer, "raj-portfolio/resume", "raw");
  const newResume = { url: uploaded.secure_url, publicId: uploaded.public_id };

  try {
    profile.resumeUrl = newResume;
    await profile.save();
  } catch (error) {
    await deleteFromCloudinary(newResume.publicId, "raw");
    throw error;
  }

  if (oldPublicId) await deleteFromCloudinary(oldPublicId, "raw");
  res.status(200).json(new ApiResponse(200, profile, "Resume uploaded successfully"));
});
