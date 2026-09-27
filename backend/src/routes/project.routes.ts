import { Router } from "express";

import {
  createProject,
  getPublishedProjects,
  getAllProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import verifyJWT, {
  
  authorizeRoles,
} from "../middlewares/auth.middleware.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../validators/project.validator.js";

const router = Router();

// Public
// Public
router.get("/public", getPublishedProjects);


router.get("/:slug", getProjectBySlug);

// Admin
router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin"),
  validate(createProjectSchema),
  createProject
);

router.get(
  "/",
  verifyJWT,
  authorizeRoles("admin"),
  getAllProjects
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

export default router;