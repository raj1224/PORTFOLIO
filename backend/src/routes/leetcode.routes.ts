import { Router } from "express";

import {
  getLeetCodeProfile,
  getLeetCodeActivityData,
  getLeetCodeDashboardData,
} from "../controllers/leetcode.controller.js";

const router = Router();

router.get("/profile", getLeetCodeProfile);

router.get(
  "/activity",
  getLeetCodeActivityData
);

router.get(
  "/dashboard",
  getLeetCodeDashboardData
);
export default router;