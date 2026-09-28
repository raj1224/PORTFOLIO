import type { Request, Response } from "express";

import { env } from "../config/env.js";
import {
  getLeetCodeStats,
  getLeetCodeActivity,
   getLeetCodeDashboard,
} from "../services/leetcode.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getLeetCodeProfile = asyncHandler(
  async (_req: Request, res: Response) => {
    const stats = await getLeetCodeStats(
      env.LEETCODE_USERNAME
    );

    res.status(200).json(
      new ApiResponse(
        200,
        {
          username: env.LEETCODE_USERNAME,
          stats,
        },
        "LeetCode stats fetched successfully"
      )
    );
  }
);

export const getLeetCodeActivityData = asyncHandler(
  async (_req: Request, res: Response) => {
    const activity = await getLeetCodeActivity(
      env.LEETCODE_USERNAME
    );

    res.status(200).json(
      new ApiResponse(
        200,
        {
          username: env.LEETCODE_USERNAME,
          activity,
        },
        "LeetCode activity fetched successfully"
      )
    );
  }
);

export const getLeetCodeDashboardData = asyncHandler(
  async (_req: Request, res: Response) => {
    const dashboard = await getLeetCodeDashboard(
      env.LEETCODE_USERNAME
    );

    res.status(200).json(
      new ApiResponse(
        200,
        dashboard,
        "LeetCode dashboard fetched successfully"
      )
    );
  }
);