import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

import { env } from "./config/env.js";

import {
    notFoundHandler,
    errorHandler,
} from "./middlewares/error.middleware.js";

const app = express();


// Security
app.use(helmet());


// CORS
app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
    })
);


// Rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
});

app.use("/api", apiLimiter);


// Body parsers
app.use(
    express.json({
        limit: "1mb",
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "1mb",
    })
);


// Cookies
app.use(cookieParser());

// Routes imported
import authRoutes from "./routes/auth.routes.js";

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Portfolio API is running",
        environment: env.NODE_ENV,
    });
});
// routes
app.use("/api/auth", authRoutes);


// 404
app.use(notFoundHandler);


// Global error handler
app.use(errorHandler);


export default app;