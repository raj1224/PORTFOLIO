import type { Request, Response } from "express";

import CurrentStatus from "../models/current-status.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create current status - Admin
export const createCurrentStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      title,
      description,
      type,
      status,
      order,
      isVisible,
    } = req.body;

    const currentStatus = await CurrentStatus.create({
      title,
      description,
      type,
      status,
      order,
      isVisible,
    });

    res.status(201).json(
      new ApiResponse(
        201,
        currentStatus,
        "Current status created successfully"
      )
    );
  }
);

// Get visible current statuses - Public
export const getVisibleCurrentStatuses = asyncHandler(
  async (_req: Request, res: Response) => {
    const currentStatuses = await CurrentStatus.find({
      isVisible: true,
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json(
      new ApiResponse(
        200,
        currentStatuses,
        "Current statuses fetched successfully"
      )
    );
  }
);

// Get all current statuses - Admin
export const getAllCurrentStatuses = asyncHandler(
  async (_req: Request, res: Response) => {
    const currentStatuses = await CurrentStatus.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json(
      new ApiResponse(
        200,
        currentStatuses,
        "All current statuses fetched successfully"
      )
    );
  }
);

// Update current status - Admin
export const updateCurrentStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { statusId } = req.params;

    const currentStatus = await CurrentStatus.findByIdAndUpdate(
      statusId,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!currentStatus) {
      throw new ApiError(404, "Current status not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        currentStatus,
        "Current status updated successfully"
      )
    );
  }
);

// Delete current status - Admin
export const deleteCurrentStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { statusId } = req.params;

    const currentStatus = await CurrentStatus.findByIdAndDelete(statusId);

    if (!currentStatus) {
      throw new ApiError(404, "Current status not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Current status deleted successfully"
      )
    );
  }
);