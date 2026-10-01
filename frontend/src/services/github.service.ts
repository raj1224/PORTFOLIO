import api from "./api";

import type {
  GitHubProfile,
  GitHubRepository,
  GitHubContributions,
} from "../types/github";

export const getGitHubProfile = async (): Promise<GitHubProfile> => {
  const response = await api.get("/github/profile");

  return response.data.data;
};

export const getGitHubRepositories = async (): Promise<
  GitHubRepository[]
> => {
  const response = await api.get("/github/repos");

  return response.data.data;
};

export const getGitHubContributions =
  async (): Promise<GitHubContributions> => {
    const response = await api.get("/github/contributions");

    return response.data.data;
  };