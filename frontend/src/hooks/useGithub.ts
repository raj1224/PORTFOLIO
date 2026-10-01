import { useQuery } from "@tanstack/react-query";

import {
  getGitHubProfile,
  getGitHubRepositories,
  getGitHubContributions,
} from "../services/github.service";

export const useGitHubProfile = () => {
  return useQuery({
    queryKey: ["github-profile"],
    queryFn: getGitHubProfile,
  });
};

export const useGitHubRepositories = () => {
  return useQuery({
    queryKey: ["github-repositories"],
    queryFn: getGitHubRepositories,
  });
};

export const useGitHubContributions = () => {
  return useQuery({
    queryKey: ["github-contributions"],
    queryFn: getGitHubContributions,
  });
};