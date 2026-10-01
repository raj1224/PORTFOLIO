import { Router } from "express";

import {
  createProject,
  getPublishedProjects,
  getAllProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
  uploadProjectImages,
  uploadProjectThumbnail,
  deleteProjectImage
} from "../controllers/project.controller.js";

import {
  uploadImage,
  
} from "../middlewares/upload.middleware.js";

import verifyJWT, {
  
  authorizeRoles,
} from "../middlewares/auth.middleware.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../validators/project.validator.js";

const router = Router();

// Admin
router.get(
  "/admin/all",
  verifyJWT,
  authorizeRoles("admin"),
  getAllProjects
);

// Public
router.get(
  "/",
  getPublishedProjects
);

router.get(
  "/:slug",
  getProjectBySlug
);

// Admin
router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin"),
  validate(createProjectSchema),
  createProject
);

router.patch(
  "/:projectId",
  verifyJWT,
  authorizeRoles("admin"),
  validate(updateProjectSchema),
  updateProject
);

router.delete(
  "/:projectId",
  verifyJWT,
  authorizeRoles("admin"),
  deleteProject
);

router.post(
  "/:projectId/images",
  verifyJWT,
  authorizeRoles("admin"),
  uploadImage.array("images", 10),
  uploadProjectImages
);

router.patch(
  "/:projectId/thumbnail",
  verifyJWT,
  authorizeRoles("admin"),
  uploadImage.single("thumbnail"),
  uploadProjectThumbnail
);

router.delete(
  "/:projectId/images",
  verifyJWT,
  authorizeRoles("admin"),
  deleteProjectImage
);

export default router;