import { Router } from "express";

import {
    loginAdmin,
    refreshAccessToken,
    logoutAdmin,
    getCurrentAdmin,
} from "../controllers/auth.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
    loginSchema,
} from "../validators/auth.validator.js";

const router = Router();


// ===============================
// ADMIN LOGIN
// ===============================

router.post(
    "/login",
    validate(loginSchema),
    loginAdmin
);


// ===============================
// REFRESH ACCESS TOKEN
// ===============================

router.post(
    "/refresh",
    refreshAccessToken
);


// ===============================
// ADMIN LOGOUT
// ===============================

router.post(
    "/logout",
    verifyJWT,
    logoutAdmin
);


// ===============================
// CURRENT ADMIN
// ===============================

router.get(
    "/me",
    verifyJWT,
    getCurrentAdmin
);


export default router;