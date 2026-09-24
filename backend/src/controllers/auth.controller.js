import Admin from "../models/admin.model.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../utils/jwt.js";


// Cookie options
const getCookieOptions = (maxAge) => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production"
        ? "strict"
        : "lax",
    maxAge,
});


// ===============================
// LOGIN
// ===============================

export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin
        .findOne({ email })
        .select("+password +refreshToken");

    if (!admin) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    if (!admin.isActive) {
        throw new ApiError(
            403,
            "Admin account is inactive"
        );
    }

    const isPasswordCorrect =
        await admin.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    const accessToken = generateAccessToken(
        admin._id.toString()
    );

    const refreshToken = generateRefreshToken(
        admin._id.toString()
    );

    admin.refreshToken = refreshToken;

    await admin.save({
        validateBeforeSave: false,
    });

    const safeAdmin = {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        avatar: admin.avatar,
    };

    res
        .status(200)
        .cookie(
            "accessToken",
            accessToken,
            getCookieOptions(15 * 60 * 1000)
        )
        .cookie(
            "refreshToken",
            refreshToken,
            getCookieOptions(7 * 24 * 60 * 60 * 1000)
        )
        .json(
            new ApiResponse(
                200,
                {
                    admin: safeAdmin,
                },
                "Admin logged in successfully"
            )
        );
});


// ===============================
// REFRESH ACCESS TOKEN
// ===============================

export const refreshAccessToken = asyncHandler(
    async (req, res) => {

        const refreshToken =
            req.cookies?.refreshToken;

        if (!refreshToken) {
            throw new ApiError(
                401,
                "Refresh token is required"
            );
        }

        let decodedToken;

        try {
            decodedToken =
                verifyRefreshToken(refreshToken);
        } catch (error) {
            throw new ApiError(
                401,
                "Invalid or expired refresh token"
            );
        }

        if (
            !decodedToken?.id ||
            decodedToken?.type !== "refresh"
        ) {
            throw new ApiError(
                401,
                "Invalid refresh token"
            );
        }

        const admin = await Admin
            .findById(decodedToken.id)
            .select("+refreshToken");

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

        // Prevent reuse of an old refresh token
        if (admin.refreshToken !== refreshToken) {
            throw new ApiError(
                401,
                "Refresh token is invalid"
            );
        }

        const newAccessToken =
            generateAccessToken(
                admin._id.toString()
            );

        const newRefreshToken =
            generateRefreshToken(
                admin._id.toString()
            );

        admin.refreshToken = newRefreshToken;

        await admin.save({
            validateBeforeSave: false,
        });

        res
            .status(200)
            .cookie(
                "accessToken",
                newAccessToken,
                getCookieOptions(15 * 60 * 1000)
            )
            .cookie(
                "refreshToken",
                newRefreshToken,
                getCookieOptions(7 * 24 * 60 * 60 * 1000)
            )
            .json(
                new ApiResponse(
                    200,
                    null,
                    "Access token refreshed successfully"
                )
            );
    }
);


// ===============================
// LOGOUT
// ===============================

export const logoutAdmin = asyncHandler(
    async (req, res) => {

        const admin = await Admin.findById(
            req.admin._id
        ).select("+refreshToken");

        if (admin) {
            admin.refreshToken = null;

            await admin.save({
                validateBeforeSave: false,
            });
        }

        res
            .status(200)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json(
                new ApiResponse(
                    200,
                    null,
                    "Admin logged out successfully"
                )
            );
    }
);


// ===============================
// CURRENT ADMIN
// ===============================

export const getCurrentAdmin = asyncHandler(
    async (req, res) => {

        const admin = await Admin.findById(
            req.admin._id
        );

        if (!admin) {
            throw new ApiError(
                404,
                "Admin not found"
            );
        }

        res.status(200).json(
            new ApiResponse(
                200,
                {
                    admin: {
                        id: admin._id,
                        username: admin.username,
                        email: admin.email,
                        avatar: admin.avatar,
                        isActive: admin.isActive,
                    },
                },
                "Current admin fetched successfully"
            )
        );
    }
);