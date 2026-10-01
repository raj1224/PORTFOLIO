import api from "./api";
import type { LeetCodeDashboard } from "../types/leetcode";

export const getLeetCodeDashboard =
  async (): Promise<LeetCodeDashboard> => {
    const response = await api.get("/leetcode/dashboard");

    return response.data.data;
  };