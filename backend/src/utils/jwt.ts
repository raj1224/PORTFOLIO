import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import type { IUser } from "../models/user.model.js";


interface TokenPayload {
    userId: string;
    role: IUser["role"];
}

export const generateAccessToken = (
    user: IUser
): string => {
    const payload: TokenPayload = {
        userId: user._id.toString(),
        role: user.role,
    };

    return jwt.sign(
        payload,
        env.JWT_ACCESS_SECRET,
        {
            expiresIn: env.JWT_ACCESS_EXPIRES_IN,
        }
    );
};

export const generateRefreshToken = (
    user: IUser
): string => {
    const payload: TokenPayload = {
        userId: user._id.toString(),
        role: user.role,
    };

    return jwt.sign(
        payload,
        env.JWT_REFRESH_SECRET,
        {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN,
        }
    );
};