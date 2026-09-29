import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";

import { API_PREFIX } from "./constants/constants.js";

import errorMiddleware from "./middlewares/error.middleware.js";
import notFoundMiddleware from "./middlewares/not-found.middleware.js";

const app = express();

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

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// import routes
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.routes.js";
import projectRoutes from "./routes/project.routes.js";
import skillRoutes from "./routes/skill.route.js";
import currentStatusRoutes from "./routes/current-status.route.js";
import githubRoutes from "./routes/github.route.js";
import leetcodeRoutes from "./routes/leetcode.routes.js";

app.get(`${API_PREFIX}/health`, (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Portfolio API is running",
    });
});
app.use(
  `${API_PREFIX}/auth`,
  authRateLimiter,
  authRoutes
);
app.use(`${API_PREFIX}/profile`, profileRoutes);
app.use(`${API_PREFIX}/projects`, projectRoutes);
app.use(`${API_PREFIX}/skills`, skillRoutes);
app.use(
  `${API_PREFIX}/current-status`,
  currentStatusRoutes
);
app.use(`${API_PREFIX}/github`, githubRoutes);
app.use(
  `${API_PREFIX}/leetcode`,
  leetcodeRoutes
);
// app.get("/api/v1/test-error", (_req, _res) => {
//     throw new ApiError(400, "This is a test error");
// });
// app.get(
//     "/api/v1/test-async-error",
//     asyncHandler(async () => {
//         throw new ApiError(
//             500,
//             "Async error handled successfully"
//         );
//     })
// );

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;