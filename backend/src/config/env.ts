import "dotenv/config";
import { z } from "zod";
import type { StringValue } from "ms";

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(8000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  MONGODB_URI: z.string().trim().min(1),
  CLIENT_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m").transform((value) => value as StringValue),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d").transform((value) => value as StringValue),
  GITHUB_USERNAME: z.string().trim().min(1),
  GITHUB_TOKEN: z.string().trim().min(1),
  LEETCODE_USERNAME: z.string().trim().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().trim().min(1),
  CLOUDINARY_API_KEY: z.string().trim().min(1),
  CLOUDINARY_API_SECRET: z.string().trim().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
