import type { Request, Response } from "express";
import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const { title, slug, description, shortDescription, techStack, githubUrl, liveUrl, status, featured, order } = req.body;
  const existingProject = await Project.exists({ slug });
  if (existingProject) throw new ApiError(409, "A project with this slug already exists");

  const project = await Project.create({ title, slug, description, shortDescription, techStack, githubUrl, liveUrl, status, featured, order });
  res.status(201).json(new ApiResponse(201, project, "Project created successfully"));
});

export const getPublishedProjects = asyncHandler(async (_req: Request, res: Response) => {
  const projects = await Project.find({ status: "published" })
    .sort({ featured: -1, order: 1, createdAt: -1 })
    .lean();
  res.status(200).json(new ApiResponse(200, projects, "Published projects fetched successfully"));
});

export const getAllProjects = asyncHandler(async (_req: Request, res: Response) => {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
  res.status(200).json(new ApiResponse(200, projects, "All projects fetched successfully"));
});

export const getProjectBySlug = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findOne({ slug: req.params.slug, status: "published" }).lean();
  if (!project) throw new ApiError(404, "Project not found");
  res.status(200).json(new ApiResponse(200, project, "Project fetched successfully"));
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const project = await Project.findByIdAndUpdate(projectId, { $set: req.body }, { new: true, runValidators: true });
  if (!project) throw new ApiError(404, "Project not found");
  res.status(200).json(new ApiResponse(200, project, "Project updated successfully"));
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) throw new ApiError(404, "Project not found");

  const files = [
    ...project.images.map((image) => image.publicId),
    ...(project.thumbnail.publicId ? [project.thumbnail.publicId] : []),
  ];

  // Clean external assets first. If Cloudinary fails, keep the DB record so
  // the operation can be retried instead of losing the project metadata.
  await Promise.all(files.map((publicId) => deleteFromCloudinary(publicId, "image")));
  await project.deleteOne();

  res.status(200).json(new ApiResponse(200, null, "Project deleted successfully"));
});

export const uploadProjectImages = asyncHandler(async (req: Request, res: Response) => {
  const files = Array.isArray(req.files) ? req.files : [];
  if (files.length === 0) throw new ApiError(400, "At least one image is required");

  const project = await Project.findById(req.params.projectId);
  if (!project) throw new ApiError(404, "Project not found");

  const uploadedImages: Array<{ url: string; publicId: string }> = [];
  try {
    const uploaded = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer, "raj-portfolio/projects", "image"))
    );
    uploadedImages.push(...uploaded.map((image) => ({ url: image.secure_url, publicId: image.public_id })));
    project.images.push(...uploadedImages);
    await project.save();
  } catch (error) {
    await Promise.allSettled(uploadedImages.map((image) => deleteFromCloudinary(image.publicId, "image")));
    throw error;
  }

  res.status(200).json(new ApiResponse(200, project, "Project images uploaded successfully"));
});

export const uploadProjectThumbnail = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) throw new ApiError(400, "Thumbnail image is required");

  const project = await Project.findById(req.params.projectId);
  if (!project) throw new ApiError(404, "Project not found");

  const oldPublicId = project.thumbnail.publicId;
  const uploaded = await uploadToCloudinary(req.file.buffer, "raj-portfolio/projects", "image");
  const newThumbnail = { url: uploaded.secure_url, publicId: uploaded.public_id };

  try {
    project.thumbnail = newThumbnail;
    await project.save();
  } catch (error) {
    await deleteFromCloudinary(newThumbnail.publicId, "image");
    throw error;
  }

  if (oldPublicId) await deleteFromCloudinary(oldPublicId, "image");
  res.status(200).json(new ApiResponse(200, project, "Project thumbnail uploaded successfully"));
});

export const deleteProjectImage = asyncHandler(async (req: Request, res: Response) => {
  const { publicId } = req.body as { publicId?: string };
  if (!publicId) throw new ApiError(400, "Image public ID is required");

  const project = await Project.findById(req.params.projectId);
  if (!project) throw new ApiError(404, "Project not found");

  const imageIndex = project.images.findIndex((image) => image.publicId === publicId);
  if (imageIndex === -1) throw new ApiError(404, "Project image not found");

  // Delete external asset first. Keep DB state unchanged if that fails.
  await deleteFromCloudinary(publicId, "image");
  project.images.splice(imageIndex, 1);
  await project.save();

  res.status(200).json(new ApiResponse(200, project, "Project image deleted successfully"));
});
