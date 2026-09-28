import { z } from "zod";

export const createCurrentStatusSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),

  type: z.enum(["learning", "working", "building"]),

  status: z
    .enum(["planning", "in_progress", "completed", "paused"])
    .default("in_progress"),

  order: z
    .number()
    .int()
    .min(0)
    .default(0),

  isVisible: z
    .boolean()
    .default(true),
});

export const updateCurrentStatusSchema =
  createCurrentStatusSchema.partial();