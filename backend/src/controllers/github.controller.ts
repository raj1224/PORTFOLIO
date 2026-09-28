import type { Request, Response } from "express";

import {
  getGitHubProfile,
  getGitHubRepositories,
  getGitHubContributions,
} from "../services/github.service.js";

import { env } from "../config/env.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getGitHubProfileController = asyncHandler(
  async (_req: Request, res: Response) => {
    const profile = await getGitHubProfile(env.GITHUB_USERNAME);

    res.status(200).json(
      new ApiResponse(
        200,
        profile,
        "GitHub profile fetched successfully"
      )
    );
  }
);

export const getGitHubRepositoriesController = asyncHandler(
  async (_req: Request, res: Response) => {
    const repositories = await getGitHubRepositories(
      env.GITHUB_USERNAME
    );

    res.status(200).json(
      new ApiResponse(
        200,
        repositories,
        "GitHub repositories fetched successfully"
      )
    );
  }
);

export const getGitHubContributionsController = asyncHandler(
  async (_req: Request, res: Response) => {
    const contributions = await getGitHubContributions(
      env.GITHUB_USERNAME
    );

    res.status(200).json(
      new ApiResponse(
        200,
        contributions,
        "GitHub contributions fetched successfully"
      )
    );
  }
);