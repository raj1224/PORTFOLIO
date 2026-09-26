import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";

import { API_PREFIX } from "./constants/constants.js";





import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true,
    })
);

app.use(helmet());

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    })
);

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// import routes
import authRoutes from "./routes/auth.route.js";

app.get(`${API_PREFIX}/health`, (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Portfolio API is running",
    });
});
app.use(`${API_PREFIX}/auth`, authRoutes);
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

app.use(errorMiddleware);

export default app;