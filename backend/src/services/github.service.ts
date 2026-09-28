const GITHUB_API_URL = "https://api.github.com";
import { env } from "../config/env.js";

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export const getGitHubProfile = async (
  username: string
): Promise<GitHubUser> => {
  const response = await fetch(
    `${GITHUB_API_URL}/users/${username}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "raj-portfolio",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub profile request failed: ${response.status}`
    );
  }

  return response.json() as Promise<GitHubUser>;
};

export const getGitHubRepositories = async (
  username: string
): Promise<GitHubRepository[]> => {
  const response = await fetch(
    `${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "raj-portfolio",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub repositories request failed: ${response.status}`
    );
  }

  return response.json() as Promise<GitHubRepository[]>;
};

interface GitHubContributionDay {
  date: string;
  contributionCount: number;
}

interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

interface GitHubContributionsResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: GitHubContributionWeek[];
        };
      };
    };
  };
}

export const getGitHubContributions = async (
  username: string
): Promise<{
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}> => {
  const query = `
    query ($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(
    "https://api.github.com/graphql",
    {
      method: "POST",

      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "raj-portfolio",
      },

      body: JSON.stringify({
        query,
        variables: {
          username,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub GraphQL request failed: ${response.status}`
    );
  }

  const result =
    (await response.json()) as GitHubContributionsResponse;

  if (!result.data?.user) {
    throw new Error("GitHub user not found");
  }

  const calendar =
    result.data.user.contributionsCollection
      .contributionCalendar;

  return {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
  };
};