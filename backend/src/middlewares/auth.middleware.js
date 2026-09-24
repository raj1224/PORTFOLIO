import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Admin from "../models/admin.model.js";
import { verifyAccessToken } from "../utils/jwt.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        throw new ApiError(
            401,
            "Authentication required"
        );
    }

    let decodedToken;

    try {
        decodedToken = verifyAccessToken(token);
    } catch (error) {
        throw new ApiError(
            401,
            "Invalid or expired access token"
        );
    }

    if (
        !decodedToken?.id ||
        decodedToken?.type !== "access"
    ) {
        throw new ApiError(
            401,
            "Invalid access token"
        );
    }

    const admin = await Admin.findById(decodedToken.id);

    if (!admin) {
        throw new ApiError(
            401,
            "Admin not found"
        );
    }

    if (!admin.isActive) {
        throw new ApiError(
            403,
            "Admin account is inactive"
        );
    }

    req.admin = admin;

    next();
});

export default verifyJWT;