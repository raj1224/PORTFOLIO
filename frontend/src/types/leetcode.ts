export interface LeetCodeStats {
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

export interface LeetCodeActivity {
  totalSubmissions: number;
  activeDays: number;
  submissionsByDate: Record<string, number>;
}

export interface LeetCodeDashboard {
  username: string;
  stats: LeetCodeStats;
  activity: LeetCodeActivity;
}