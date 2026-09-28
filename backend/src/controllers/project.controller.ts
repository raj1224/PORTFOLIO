import type { Request, Response } from "express";

import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadToCloudinary,deleteFromCloudinary } from "../utils/cloudinary.js";

// Create project
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
      images,
      thumbnail,
      status,
      featured,
      order,
    } = req.body;

    const existingProject = await Project.findOne({ slug });

    if (existingProject) {
      throw new ApiError(
        409,
        "A project with this slug already exists"
      );
    }

    const project = await Project.create({
      title,
      slug,
      description,
      shortDescription,
      techStack,
      githubUrl,
      liveUrl,
      images,
      thumbnail,
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

// Get published projects - Public
export const getPublishedProjects = asyncHandler(
  async (_req: Request, res: Response) => {
    const projects = await Project.find({
      status: "published",
    }).sort({
      featured: -1,
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

// Get all projects - Admin
export const getAllProjects = asyncHandler(
  async (_req: Request, res: Response) => {
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

// Get single published project - Public
export const getProjectBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;

    const project = await Project.findOne({
      slug,
      status: "published",
    });

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

// Update project - Admin
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

// Delete project - Admin
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

// Upload project images - Admin
export const uploadProjectImages = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId } = req.params;

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw new ApiError(400, "At least one image is required");
    }

    const project = await Project.findById(projectId);

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    const uploadedImages = await Promise.all(
      req.files.map((file) =>
        uploadToCloudinary(
          file.buffer,
          "raj-portfolio/projects",
          "image"
        )
      )
    );

    const imageUrls = uploadedImages.map(
      (image) => image.secure_url
    );

    project.images.push(
  ...uploadedImages.map((image) => ({
    url: image.secure_url,
    publicId: image.public_id,
  }))
);

    await project.save();

    res.status(200).json(
      new ApiResponse(
        200,
        project,
        "Project images uploaded successfully"
      )
    );
  }
);


// Upload project thumbnail - Admin
export const uploadProjectThumbnail = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId } = req.params;

    if (!req.file) {
      throw new ApiError(400, "Thumbnail image is required");
    }

    const project = await Project.findById(projectId);

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    const oldThumbnailPublicId = project.thumbnail.publicId;

const uploaded = await uploadToCloudinary(
  req.file.buffer,
  "raj-portfolio/projects",
  "image"
);

project.thumbnail = {
  url: uploaded.secure_url,
  publicId: uploaded.public_id,
};

    await project.save();

    if (oldThumbnailPublicId) {
  await deleteFromCloudinary(oldThumbnailPublicId, "image");
}

    res.status(200).json(
      new ApiResponse(
        200,
        project,
        "Project thumbnail uploaded successfully"
      )
    );
  }
);

// Delete project image - Admin
export const deleteProjectImage = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { publicId } = req.body;

    if (!publicId) {
      throw new ApiError(400, "Image public ID is required");
    }

    const project = await Project.findById(projectId);

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    const imageIndex = project.images.findIndex(
      (image) => image.publicId === publicId
    );

    if (imageIndex === -1) {
      throw new ApiError(404, "Project image not found");
    }

    project.images.splice(imageIndex, 1);

    await project.save();

    await deleteFromCloudinary(publicId, "image");

    res.status(200).json(
      new ApiResponse(
        200,
        project,
        "Project image deleted successfully"
      )
    );
  }
);