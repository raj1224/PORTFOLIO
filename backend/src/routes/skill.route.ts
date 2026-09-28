import { Router } from "express";

import {
  createSkill,
  getVisibleSkills,
  getAllSkills,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";

import verifyJWT, {
  
  authorizeRoles,
} from "../middlewares/auth.middleware.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createSkillSchema,
  updateSkillSchema,
} from "../validators/skill.validator.js";

const router = Router();

// Public
router.get("/", getVisibleSkills);

// Admin
router.get(
  "/admin/all",
  verifyJWT,
  authorizeRoles("admin"),
  getAllSkills
);

router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin"),
  validate(createSkillSchema),
  createSkill
);

router.patch(
  "/:skillId",
  verifyJWT,
  authorizeRoles("admin"),
  validate(updateSkillSchema),
  updateSkill
);

router.delete(
  "/:skillId",
  verifyJWT,
  authorizeRoles("admin"),
  deleteSkill
);

export default router;