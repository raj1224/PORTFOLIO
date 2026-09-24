import "dotenv/config";

const requiredEnvVariables = [
    "MONGODB_URI",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
}

export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",

    PORT: Number(process.env.PORT) || 5000,

    MONGODB_URI: process.env.MONGODB_URI,

    CORS_ORIGIN:
        process.env.CORS_ORIGIN || "http://localhost:5173",

    JWT_ACCESS_SECRET:
        process.env.JWT_ACCESS_SECRET,

    JWT_ACCESS_EXPIRES_IN:
        process.env.JWT_ACCESS_EXPIRES_IN || "15m",

    JWT_REFRESH_SECRET:
        process.env.JWT_REFRESH_SECRET,

    JWT_REFRESH_EXPIRES_IN:
        process.env.JWT_REFRESH_EXPIRES_IN || "7d",
};