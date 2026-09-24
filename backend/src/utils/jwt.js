import jwt from "jsonwebtoken";
import { env } from "../config/env.js";


// Generate access token
export const generateAccessToken = (adminId) => {
    return jwt.sign(
        {
            id: adminId,
            type: "access",
        },
        env.JWT_ACCESS_SECRET,
        {
            expiresIn: env.JWT_ACCESS_EXPIRES_IN,
        }
    );
};


// Generate refresh token
export const generateRefreshToken = (adminId) => {
    return jwt.sign(
        {
            id: adminId,
            type: "refresh",
        },
        env.JWT_REFRESH_SECRET,
        {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN,
        }
    );
};


// Verify access token
export const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        env.JWT_ACCESS_SECRET
    );
};


// Verify refresh token
export const verifyRefreshToken = (token) => {
    return jwt.verify(
        token,
        env.JWT_REFRESH_SECRET
    );
};