import type { Request, Response } from "express";

import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      title,
      slug,
      description,
      shortDescription,
      techStack,
      githubUrl,
      liveUrl,
      status,
      featured,
      order,
    } = req.body;

    const existingProject = await Project.findOne({ slug });

    if (existingProject) {
      throw new ApiError(409, "A project with this slug already exists");
    }

    const project = await Project.create({
      title,
      slug,
      description,
      shortDescription,
      techStack,
      githubUrl,
      liveUrl,
      status,
      featured,
      order,
    });

    res.status(201).json(
      new ApiResponse(
        201,
        project,
        "Project created successfully"
      )
    );
  }
);

export const getPublishedProjects = asyncHandler(
  async (_req: Request, res: Response) => {
    const projects = await Project.find({
      status: "published",
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json(
      new ApiResponse(
        200,
        projects,
        "Published projects fetched successfully"
      )
    );
  }
);

export const getAllProjects = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const projects = await Project.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json(
      new ApiResponse(
        200,
        projects,
        "All projects fetched successfully"
      )
    );
  }
);

export const getProjectBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;

    const project = await Project.findOne({ slug });

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        project,
        "Project fetched successfully"
      )
    );
  }
);

export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId } = req.params;

    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        project,
        "Project updated successfully"
      )
    );
  }
);

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId } = req.params;

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Project deleted successfully"
      )
    );
  }
);