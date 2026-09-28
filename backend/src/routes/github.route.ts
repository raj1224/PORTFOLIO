import { Router } from "express";

import {
  getGitHubProfileController,
  getGitHubRepositoriesController,
  getGitHubContributionsController,
} from "../controllers/github.controller.js";

const router = Router();

router.get("/profile", getGitHubProfileController);
router.get("/repos", getGitHubRepositoriesController);
router.get("/contributions", getGitHubContributionsController);

export default router;