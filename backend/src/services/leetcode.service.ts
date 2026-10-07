const LEETCODE_API_URL = "https://leetcode.com/graphql";
const REQUEST_TIMEOUT_MS = 10_000;
const CACHE_TTL_MS = 5 * 60 * 1000;

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  ranking: number;
}

interface LeetCodeStatsResponse {
  data?: {
    matchedUser?: {
      profile: { ranking: number };
      submitStats: { acSubmissionNum: { difficulty: string; count: number }[] };
    } | null;
    allQuestionsCount?: { difficulty: string; count: number }[];
  };
  errors?: Array<{ message: string }>;
}

interface LeetCodeActivityResponse {
  data?: {
    matchedUser?: {
      userCalendar: { submissionCalendar: string };
    } | null;
  };
  errors?: Array<{ message: string }>;
}

interface LeetCodeActivity {
  totalSubmissions: number;
  activeDays: number;
  submissionsByDate: Record<string, number>;
}

const cache = new Map<string, { expiresAt: number; value: unknown }>();

const cached = async <T>(key: string, loader: () => Promise<T>): Promise<T> => {
  const entry = cache.get(key);
  if (entry && entry.expiresAt > Date.now()) return entry.value as T;
  const value = await loader();
  cache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, value });
  return value;
};

const queryLeetCode = async <T>(query: string, username: string): Promise<T> => {
  const response = await fetch(LEETCODE_API_URL, {
    method: "POST",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { "Content-Type": "application/json", "User-Agent": "raj-portfolio" },
    body: JSON.stringify({ query, variables: { username } }),
  });

  if (!response.ok) throw new Error(`LeetCode request failed: ${response.status}`);
  return response.json() as Promise<T>;
};

const getCount = (data: { difficulty: string; count: number }[], difficulty: string) =>
  data.find((item) => item.difficulty === difficulty)?.count ?? 0;

export const getLeetCodeStats = (username: string): Promise<LeetCodeStats> =>
  cached(`leetcode:stats:${username}`, async () => {
    const query = `query getUserStats($username: String!) { matchedUser(username: $username) { profile { ranking } submitStats: submitStatsGlobal { acSubmissionNum { difficulty count } } } allQuestionsCount { difficulty count } }`;
    const result = await queryLeetCode<LeetCodeStatsResponse>(query, username);
    if (result.errors?.length) throw new Error(`LeetCode request failed: ${result.errors[0].message}`);
    const matchedUser = result.data?.matchedUser;
    if (!matchedUser || !result.data?.allQuestionsCount) throw new Error("LeetCode user not found");

    const submissions = matchedUser.submitStats.acSubmissionNum;
    const questions = result.data.allQuestionsCount;
    const easySolved = getCount(submissions, "Easy");
    const mediumSolved = getCount(submissions, "Medium");
    const hardSolved = getCount(submissions, "Hard");
    const easyTotal = getCount(questions, "Easy");
    const mediumTotal = getCount(questions, "Medium");
    const hardTotal = getCount(questions, "Hard");

    return {
      totalSolved: easySolved + mediumSolved + hardSolved,
      easySolved, mediumSolved, hardSolved,
      totalQuestions: easyTotal + mediumTotal + hardTotal,
      easyTotal, mediumTotal, hardTotal,
      ranking: matchedUser.profile.ranking,
    };
  });

export const getLeetCodeActivity = (username: string): Promise<LeetCodeActivity> =>
  cached(`leetcode:activity:${username}`, async () => {
    const query = `query getUserActivity($username: String!) { matchedUser(username: $username) { userCalendar { submissionCalendar } } }`;
    const result = await queryLeetCode<LeetCodeActivityResponse>(query, username);
    if (result.errors?.length) throw new Error(`LeetCode request failed: ${result.errors[0].message}`);
    const calendarString = result.data?.matchedUser?.userCalendar?.submissionCalendar;
    if (!calendarString) throw new Error("LeetCode user not found");

    let calendar: Record<string, number>;
    try {
      calendar = JSON.parse(calendarString) as Record<string, number>;
    } catch {
      throw new Error("LeetCode returned invalid activity data");
    }

    const submissionsByDate: Record<string, number> = {};
    let totalSubmissions = 0;
    for (const [timestamp, count] of Object.entries(calendar)) {
      const date = new Date(Number(timestamp) * 1000).toISOString().slice(0, 10);
      submissionsByDate[date] = count;
      totalSubmissions += count;
    }

    return { totalSubmissions, activeDays: Object.keys(submissionsByDate).length, submissionsByDate };
  });

export const getLeetCodeDashboard = async (username: string) => {
  const [stats, activity] = await Promise.all([getLeetCodeStats(username), getLeetCodeActivity(username)]);
  return { username, stats, activity };
};
