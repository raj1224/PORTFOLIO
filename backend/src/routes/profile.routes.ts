import { Router } from "express";

import {
  getMyProfile,
  updateMyProfile,
  uploadAvatar,
  uploadResume,
} from "../controllers/profile.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { updateProfileSchema } from "../validators/profile.validator.js";
import {
  uploadImage,
  uploadPdf,
} from "../middlewares/upload.middleware.js";



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

router.patch(
  "/avatar",
  verifyJWT,
  uploadImage.single("avatar"),
  uploadAvatar
);

router.patch(
  "/resume",
  verifyJWT,
  uploadPdf.single("resume"),
  uploadResume
);

export default router;