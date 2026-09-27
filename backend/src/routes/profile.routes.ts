import { Router } from "express";

import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/profile.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { updateProfileSchema } from "../validators/profile.validator.js";

const router = Router();

router.get(
  "/me",
  verifyJWT,
  getMyProfile
);

router.patch(
  "/me",
  verifyJWT,
  validate(updateProfileSchema),
  updateMyProfile
);

export default router;