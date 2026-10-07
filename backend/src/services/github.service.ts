import { env } from "../config/env.js";

const GITHUB_API_URL = "https://api.github.com";
const REQUEST_TIMEOUT_MS = 10_000;
const CACHE_TTL_MS = 5 * 60 * 1000;

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

interface GitHubContributionDay { date: string; contributionCount: number; }
interface GitHubContributionWeek { contributionDays: GitHubContributionDay[]; }

interface GitHubContributionsResponse {
  data?: { user?: { contributionsCollection: { contributionCalendar: { totalContributions: number; weeks: GitHubContributionWeek[] } } | null } | null };
  errors?: Array<{ message: string }>;
}

const cache = new Map<string, { expiresAt: number; value: unknown }>();

const cached = async <T>(key: string, loader: () => Promise<T>): Promise<T> => {
  const entry = cache.get(key);
  if (entry && entry.expiresAt > Date.now()) return entry.value as T;
  const value = await loader();
  cache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, value });
  return value;
};

const githubFetch = async (url: string, init: RequestInit = {}) => {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "raj-portfolio",
      ...init.headers,
    },
  });
  if (!response.ok) throw new Error(`GitHub request failed: ${response.status}`);
  return response;
};

export const getGitHubProfile = (username: string): Promise<GitHubUser> =>
  cached(`github:profile:${username}`, async () => (await githubFetch(`${GITHUB_API_URL}/users/${username}`)).json() as Promise<GitHubUser>);

export const getGitHubRepositories = (username: string): Promise<GitHubRepository[]> =>
  cached(`github:repos:${username}`, async () => (await githubFetch(`${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=100`)).json() as Promise<GitHubRepository[]>);

export const getGitHubContributions = (username: string) =>
  cached(`github:contributions:${username}`, async () => {
    const query = `query ($username: String!) { user(login: $username) { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } } } }`;
    const response = await githubFetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { username } }),
    });
    const result = (await response.json()) as GitHubContributionsResponse;
    if (result.errors?.length) throw new Error(`GitHub GraphQL request failed: ${result.errors[0].message}`);
    const calendar = result.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) throw new Error("GitHub user not found");
    return { totalContributions: calendar.totalContributions, weeks: calendar.weeks };
  });
