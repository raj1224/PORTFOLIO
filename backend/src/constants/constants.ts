export const USER_ROLES = {
    ADMIN: "admin",
    USER: "user",
} as const;

export const PROJECT_STATUS = {
    DRAFT: "draft",
    PUBLISHED: "published",
    ARCHIVED: "archived",
} as const;

export const CURRENT_STATUS = {
    PLANNING: "planning",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
    PAUSED: "paused",
} as const;

export const API_PREFIX = "/api/v1";