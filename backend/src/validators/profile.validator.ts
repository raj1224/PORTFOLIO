import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters")
    .optional(),

  bio: z
    .string()
    .trim()
    .max(1000, "Bio must not exceed 1000 characters")
    .optional(),

  title: z
    .string()
    .trim()
    .max(100, "Title must not exceed 100 characters")
    .optional(),

  location: z
    .string()
    .trim()
    .max(100, "Location must not exceed 100 characters")
    .optional(),

  phone: z
    .string()
    .trim()
    .max(20, "Phone number is too long")
    .optional(),

  website: z
    .string()
    .trim()
    .url("Invalid website URL")
    .or(z.literal(""))
    .optional(),

  github: z
    .string()
    .trim()
    .url("Invalid GitHub URL")
    .or(z.literal(""))
    .optional(),

  linkedin: z
    .string()
    .trim()
    .url("Invalid LinkedIn URL")
    .or(z.literal(""))
    .optional(),

  twitter: z
    .string()
    .trim()
    .url("Invalid Twitter URL")
    .or(z.literal(""))
    .optional(),
});