import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";
import { API_PREFIX } from "./constants/constants.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import notFoundMiddleware from "./middlewares/not-found.middleware.js";

import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.routes.js";
import projectRoutes from "./routes/project.routes.js";
import skillRoutes from "./routes/skill.route.js";
import currentStatusRoutes from "./routes/current-status.route.js";
import githubRoutes from "./routes/github.route.js";
import leetcodeRoutes from "./routes/leetcode.routes.js";

const app = express();

// Required when running behind a reverse proxy (Render, Railway, Nginx, etc.).
if (env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());

const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later",
  },
});

app.use(globalRateLimiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.get(`${API_PREFIX}/health`, (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
  });
});

// Rate-limit only credential-changing endpoints.
// current-user/refresh/logout are intentionally not behind this limiter so
// normal app startup and token refresh do not trigger false 429 responses.
app.use(`${API_PREFIX}/auth/register`, authRateLimiter);
app.use(`${API_PREFIX}/auth/login`, authRateLimiter);
app.use(`${API_PREFIX}/auth`, authRoutes);

app.use(`${API_PREFIX}/profile`, profileRoutes);
app.use(`${API_PREFIX}/projects`, projectRoutes);
app.use(`${API_PREFIX}/skills`, skillRoutes);
app.use(`${API_PREFIX}/current-status`, currentStatusRoutes);
app.use(`${API_PREFIX}/github`, githubRoutes);
app.use(`${API_PREFIX}/leetcode`, leetcodeRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
