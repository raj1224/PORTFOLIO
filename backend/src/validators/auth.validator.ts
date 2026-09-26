import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must not exceed 30 characters"),

    email: z
        .string()
        .trim()
        .email("Please provide a valid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must not exceed 100 characters"),
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email"),

    password: z
        .string()
        .min(1, "Password is required"),
});

export const changePasswordSchema = z.object({
    oldPassword: z
        .string()
        .min(1, "Old password is required"),

    newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters")
        .max(100, "New password must not exceed 100 characters"),
});