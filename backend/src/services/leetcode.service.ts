const LEETCODE_API_URL = "https://leetcode.com/graphql";

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

interface LeetCodeResponse {
  data: {
    matchedUser: {
      profile: {
        ranking: number;
      };
      submitStats: {
        acSubmissionNum: {
          difficulty: string;
          count: number;
        }[];
      };
    };
    allQuestionsCount: {
      difficulty: string;
      count: number;
    }[];
  };
}

export const getLeetCodeStats = async (
  username: string
): Promise<LeetCodeStats> => {
  const query = `
    query getUserStats($username: String!) {
      matchedUser(username: $username) {
        profile {
          ranking
        }

        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }

      allQuestionsCount {
        difficulty
        count
      }
    }
  `;

  const response = await fetch(LEETCODE_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "User-Agent": "raj-portfolio",
    },

    body: JSON.stringify({
      query,
      variables: {
        username,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `LeetCode request failed: ${response.status}`
    );
  }

  const result =
    (await response.json()) as LeetCodeResponse;

  if (!result.data?.matchedUser) {
    throw new Error("LeetCode user not found");
  }

  const submissions =
    result.data.matchedUser.submitStats.acSubmissionNum;

  const questions = result.data.allQuestionsCount;

  const getCount = (
    data: { difficulty: string; count: number }[],
    difficulty: string
  ): number => {
    return (
      data.find(
        (item) => item.difficulty === difficulty
      )?.count ?? 0
    );
  };

  const easySolved = getCount(submissions, "Easy");
  const mediumSolved = getCount(submissions, "Medium");
  const hardSolved = getCount(submissions, "Hard");

  const easyTotal = getCount(questions, "Easy");
  const mediumTotal = getCount(questions, "Medium");
  const hardTotal = getCount(questions, "Hard");

  return {
    totalSolved: easySolved + mediumSolved + hardSolved,

    easySolved,
    mediumSolved,
    hardSolved,

    totalQuestions:
      easyTotal + mediumTotal + hardTotal,

    easyTotal,
    mediumTotal,
    hardTotal,

    ranking: result.data.matchedUser.profile.ranking,
  };
};

interface LeetCodeSubmissionResponse {
  data: {
    matchedUser: {
      submitStats: {
        acSubmissionNum: {
          difficulty: string;
          count: number;
        }[];
      };
      userCalendar: {
        submissionCalendar: string;
      };
    };
  };
}

interface LeetCodeActivity {
  totalSubmissions: number;
  activeDays: number;
  submissionsByDate: Record<string, number>;
}

export const getLeetCodeActivity = async (
  username: string
): Promise<LeetCodeActivity> => {
  const query = `
    query getUserActivity($username: String!) {
      matchedUser(username: $username) {
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }

        userCalendar {
          submissionCalendar
        }
      }
    }
  `;

  const response = await fetch(LEETCODE_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "User-Agent": "raj-portfolio",
    },

    body: JSON.stringify({
      query,
      variables: {
        username,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `LeetCode request failed: ${response.status}`
    );
  }

  const result =
    (await response.json()) as LeetCodeSubmissionResponse;

  if (!result.data?.matchedUser) {
    throw new Error("LeetCode user not found");
  }

  const calendar =
    JSON.parse(
      result.data.matchedUser.userCalendar.submissionCalendar
    ) as Record<string, number>;

  const submissionsByDate: Record<string, number> = {};

  let totalSubmissions = 0;

  for (const [timestamp, count] of Object.entries(calendar)) {
    const date = new Date(
      Number(timestamp) * 1000
    )
      .toISOString()
      .split("T")[0];

    submissionsByDate[date] = count;
    totalSubmissions += count;
  }

  return {
    totalSubmissions,
    activeDays: Object.keys(submissionsByDate).length,
    submissionsByDate,
  };
};

export const getLeetCodeDashboard = async (
  username: string
) => {
  const [stats, activity] = await Promise.all([
    getLeetCodeStats(username),
    getLeetCodeActivity(username),
  ]);

  return {
    username,
    stats,
    activity,
  };
};