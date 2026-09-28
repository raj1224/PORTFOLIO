import { z } from "zod";

export const createSkillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Skill name must be at least 2 characters")
    .max(50, "Skill name must not exceed 50 characters"),

  category: z
    .string()
    .trim()
    .min(2, "Category must be at least 2 characters")
    .max(50, "Category must not exceed 50 characters"),

  icon: z
    .string()
    .trim()
    .url("Invalid icon URL")
    .or(z.literal(""))
    .default(""),

  order: z
    .number()
    .int()
    .min(0)
    .default(0),

  isVisible: z
    .boolean()
    .default(true),
});

export const updateSkillSchema = createSkillSchema.partial();