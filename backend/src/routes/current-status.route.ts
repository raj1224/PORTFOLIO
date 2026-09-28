import { Router } from "express";

import {
  createCurrentStatus,
  getVisibleCurrentStatuses,
  getAllCurrentStatuses,
  updateCurrentStatus,
  deleteCurrentStatus,
} from "../controllers/current-status.controller.js";

import verifyJWT, {
  
  authorizeRoles,
} from "../middlewares/auth.middleware.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createCurrentStatusSchema,
  updateCurrentStatusSchema,
} from "../validators/current-status.validator.js";

const router = Router();

// Public
router.get("/", getVisibleCurrentStatuses);

// Admin
router.get(
  "/admin/all",
  verifyJWT,
  authorizeRoles("admin"),
  getAllCurrentStatuses
);

router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin"),
  validate(createCurrentStatusSchema),
  createCurrentStatus
);

router.patch(
  "/:statusId",
  verifyJWT,
  authorizeRoles("admin"),
  validate(updateCurrentStatusSchema),
  updateCurrentStatus
);

router.delete(
  "/:statusId",
  verifyJWT,
  authorizeRoles("admin"),
  deleteCurrentStatus
);

export default router;