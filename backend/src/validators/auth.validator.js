import { z } from "zod";


// Login validation
export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please enter a valid email address")
        .toLowerCase(),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
});


// Refresh token validation
export const refreshTokenSchema = z.object({
    refreshToken: z
        .string()
        .min(1, "Refresh token is required"),
});