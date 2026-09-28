import { z } from "zod";

export const createProjectSchema = z.object({

  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),

  slug: z
    .string()
    .trim()
    .min(2, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers and hyphens"
    ),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(3000, "Description must not exceed 3000 characters"),

  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters")
    .max(300, "Short description must not exceed 300 characters"),

  techStack: z
    .array(z.string().trim().min(1))
    .default([]),

  githubUrl: z
    .string()
    .trim()
    .url("Invalid GitHub URL")
    .or(z.literal(""))
    .default(""),

  liveUrl: z
    .string()
    .trim()
    .url("Invalid live URL")
    .or(z.literal(""))
    .default(""),

  images: z
    .array(
      z.string().trim().url("Invalid image URL")
    )
    .default([]),

  thumbnail: z
    .string()
    .trim()
    .url("Invalid thumbnail URL")
    .or(z.literal(""))
    .default(""),

  status: z
    .enum(["draft", "published", "archived"])
    .default("draft"),

  featured: z
    .boolean()
    .default(false),

  order: z
    .number()
    .int()
    .min(0)
    .default(0),
});

export const updateProjectSchema =
  createProjectSchema.partial();