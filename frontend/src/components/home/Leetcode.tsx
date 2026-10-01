import {
  BarChart3,
  CheckCircle2,
  Code2,
  ExternalLink,
  Flame,
  LoaderCircle,
  Trophy,
} from "lucide-react";

import { useLeetCodeDashboard } from "../../hooks/useLeetcode";

interface LeetCodeProps {
  darkMode: boolean;
}

const LeetCode = ({ darkMode }: LeetCodeProps) => {
  const { data, isLoading, isError } = useLeetCodeDashboard();

  const textPrimary = darkMode ? "text-white" : "text-slate-900";
  const textSecondary = darkMode ? "text-slate-400" : "text-slate-600";

  const cardClass = darkMode
    ? "border-white/10 bg-white/[0.03]"
    : "border-slate-200 bg-white";

  const getPercentage = (solved: number, total: number) => {
    if (!total) return 0;

    return Math.round((solved / total) * 100);
  };

  const getActivityLevel = (count: number) => {
    if (count === 0) {
      return darkMode ? "bg-white/5" : "bg-slate-100";
    }

    if (count <= 1) {
      return "bg-emerald-200";
    }

    if (count <= 3) {
      return "bg-emerald-300";
    }

    if (count <= 6) {
      return "bg-emerald-500";
    }

    return "bg-emerald-700";
  };

  /*
   * Create last 365 days for the activity graph.
   */
  const generateActivityDays = () => {
    const days: string[] = [];

    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);

      date.setDate(today.getDate() - i);

      const formattedDate = date.toISOString().split("T")[0];

      days.push(formattedDate);
    }

    return days;
  };

  const activityDays = generateActivityDays();

  /*
   * Convert the 365 days into columns.
   * Each column contains approximately one week.
   */
  const activityColumns: string[][] = [];

  let currentColumn: string[] = [];

  activityDays.forEach((date, index) => {
    currentColumn.push(date);

    if (currentColumn.length === 7 || index === activityDays.length - 1) {
      activityColumns.push(currentColumn);
      currentColumn = [];
    }
  });

  return (
    <section
      id="leetcode"
      className={`relative overflow-hidden px-6 py-24 ${
        darkMode ? "bg-[#070a12]" : "bg-slate-50"
      }`}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-yellow-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
                Problem Solving
              </span>
            </div>

            <h2
              className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${textPrimary}`}
            >
              LeetCode <span className="text-yellow-500">Progress</span>
            </h2>

            <p className={`mt-4 max-w-2xl text-sm leading-7 ${textSecondary}`}>
              Consistently solving problems to improve problem-solving,
              algorithms, and data structures.
            </p>
          </div>

          {/* Profile button */}
          {data?.username && (
            <a
              href={`https://leetcode.com/u/${data.username}/`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-5 py-3 text-sm font-semibold text-yellow-500 transition hover:bg-yellow-500/20"
            >
              <span className="text-xs font-bold">LC</span>

              View LeetCode

              <ExternalLink size={15} />
            </a>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div
            className={`flex min-h-[400px] items-center justify-center rounded-3xl border ${cardClass}`}
          >
            <div className="flex flex-col items-center gap-3">
              <LoaderCircle
                size={30}
                className="animate-spin text-yellow-500"
              />

              <p className={`text-sm ${textSecondary}`}>
                Loading LeetCode data...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div
            className={`flex min-h-[300px] flex-col items-center justify-center rounded-3xl border p-8 text-center ${cardClass}`}
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
              <Code2 className="text-red-400" />
            </div>

            <h3 className={`text-lg font-semibold ${textPrimary}`}>
              Unable to load LeetCode data
            </h3>

            <p className={`mt-2 max-w-md text-sm ${textSecondary}`}>
              The LeetCode statistics could not be fetched right now.
            </p>
          </div>
        )}

        {/* Main content */}
        {data && !isLoading && !isError && (
          <div className="space-y-6">
            {/* Top stats */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {/* Total solved */}
              <div
                className={`group rounded-2xl border p-5 transition hover:-translate-y-1 hover:border-yellow-500/30 ${cardClass}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                    <CheckCircle2
                      size={20}
                      className="text-yellow-500"
                    />
                  </div>

                  <span className="text-xs text-slate-500">
                    Problems
                  </span>
                </div>

                <p className={`text-2xl font-bold ${textPrimary}`}>
                  {data.stats.totalSolved}
                </p>

                <p className={`mt-1 text-xs ${textSecondary}`}>
                  Total Solved
                </p>
              </div>

              {/* Ranking */}
              <div
                className={`group rounded-2xl border p-5 transition hover:-translate-y-1 hover:border-yellow-500/30 ${cardClass}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                    <Trophy
                      size={20}
                      className="text-purple-400"
                    />
                  </div>

                  <span className="text-xs text-slate-500">
                    Rank
                  </span>
                </div>

                <p className={`text-2xl font-bold ${textPrimary}`}>
                  {data.stats.ranking.toLocaleString()}
                </p>

                <p className={`mt-1 text-xs ${textSecondary}`}>
                  Global Ranking
                </p>
              </div>

              {/* Submissions */}
              <div
                className={`group rounded-2xl border p-5 transition hover:-translate-y-1 hover:border-yellow-500/30 ${cardClass}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                    <BarChart3
                      size={20}
                      className="text-blue-400"
                    />
                  </div>

                  <span className="text-xs text-slate-500">
                    Activity
                  </span>
                </div>

                <p className={`text-2xl font-bold ${textPrimary}`}>
                  {data.activity.totalSubmissions}
                </p>

                <p className={`mt-1 text-xs ${textSecondary}`}>
                  Total Submissions
                </p>
              </div>

              {/* Active days */}
              <div
                className={`group rounded-2xl border p-5 transition hover:-translate-y-1 hover:border-yellow-500/30 ${cardClass}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                    <Flame
                      size={20}
                      className="text-orange-400"
                    />
                  </div>

                  <span className="text-xs text-slate-500">
                    Consistency
                  </span>
                </div>

                <p className={`text-2xl font-bold ${textPrimary}`}>
                  {data.activity.activeDays}
                </p>

                <p className={`mt-1 text-xs ${textSecondary}`}>
                  Active Days
                </p>
              </div>
            </div>

            {/* Difficulty + progress */}
            <div
              className={`grid gap-6 rounded-3xl border p-6 md:grid-cols-3 ${cardClass}`}
            >
              {/* Easy */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-emerald-400">
                      Easy
                    </p>

                    <p className={`text-xs ${textSecondary}`}>
                      {data.stats.easySolved} /{" "}
                      {data.stats.easyTotal}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-emerald-400">
                    {getPercentage(
                      data.stats.easySolved,
                      data.stats.easyTotal,
                    )}
                    %
                  </span>
                </div>

                <div
                  className={`h-2 overflow-hidden rounded-full ${
                    darkMode ? "bg-white/10" : "bg-slate-200"
                  }`}
                >
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                    style={{
                      width: `${getPercentage(
                        data.stats.easySolved,
                        data.stats.easyTotal,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-yellow-400">
                      Medium
                    </p>

                    <p className={`text-xs ${textSecondary}`}>
                      {data.stats.mediumSolved} /{" "}
                      {data.stats.mediumTotal}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-yellow-400">
                    {getPercentage(
                      data.stats.mediumSolved,
                      data.stats.mediumTotal,
                    )}
                    %
                  </span>
                </div>

                <div
                  className={`h-2 overflow-hidden rounded-full ${
                    darkMode ? "bg-white/10" : "bg-slate-200"
                  }`}
                >
                  <div
                    className="h-full rounded-full bg-yellow-500 transition-all duration-700"
                    style={{
                      width: `${getPercentage(
                        data.stats.mediumSolved,
                        data.stats.mediumTotal,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-red-400">
                      Hard
                    </p>

                    <p className={`text-xs ${textSecondary}`}>
                      {data.stats.hardSolved} /{" "}
                      {data.stats.hardTotal}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-red-400">
                    {getPercentage(
                      data.stats.hardSolved,
                      data.stats.hardTotal,
                    )}
                    %
                  </span>
                </div>

                <div
                  className={`h-2 overflow-hidden rounded-full ${
                    darkMode ? "bg-white/10" : "bg-slate-200"
                  }`}
                >
                  <div
                    className="h-full rounded-full bg-red-500 transition-all duration-700"
                    style={{
                      width: `${getPercentage(
                        data.stats.hardSolved,
                        data.stats.hardTotal,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Activity heatmap */}
            <div
              className={`rounded-3xl border p-6 ${cardClass}`}
            >
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <Flame
                      size={18}
                      className="text-orange-400"
                    />

                    <h3
                      className={`font-semibold ${textPrimary}`}
                    >
                      Coding Activity
                    </h3>
                  </div>

                  <p
                    className={`mt-1 text-xs ${textSecondary}`}
                  >
                    Your LeetCode submission activity over the
                    last year.
                  </p>
                </div>

                <div
                  className={`text-xs ${textSecondary}`}
                >
                  {data.activity.totalSubmissions} submissions
                </div>
              </div>

              {/* Heatmap */}
              <div className="overflow-x-auto pb-2">
                <div className="flex min-w-[720px] gap-1">
                  {activityColumns.map(
                    (column, columnIndex) => (
                      <div
                        key={columnIndex}
                        className="flex flex-col gap-1"
                      >
                        {column.map((date) => {
                          const count =
                            data.activity
                              .submissionsByDate[date] ?? 0;

                          return (
                            <div
                              key={date}
                              title={`${date}: ${count} submission${
                                count === 1 ? "" : "s"
                              }`}
                              className={`h-3 w-3 rounded-[3px] transition-transform hover:scale-125 ${getActivityLevel(
                                count,
                              )}`}
                            />
                          );
                        })}
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-5 flex items-center justify-end gap-2">
                <span
                  className={`text-[10px] ${textSecondary}`}
                >
                  Less
                </span>

                <span
                  className={`h-3 w-3 rounded-[3px] ${
                    darkMode ? "bg-white/5" : "bg-slate-100"
                  }`}
                />

                <span className="h-3 w-3 rounded-[3px] bg-emerald-200" />
                <span className="h-3 w-3 rounded-[3px] bg-emerald-300" />
                <span className="h-3 w-3 rounded-[3px] bg-emerald-500" />
                <span className="h-3 w-3 rounded-[3px] bg-emerald-700" />

                <span
                  className={`text-[10px] ${textSecondary}`}
                >
                  More
                </span>
              </div>
            </div>

            {/* Bottom information */}
            <div
              className={`grid gap-6 md:grid-cols-2`}
            >
              {/* Solving overview */}
              <div
                className={`rounded-3xl border p-6 ${cardClass}`}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                    <Code2
                      size={19}
                      className="text-indigo-400"
                    />
                  </div>

                  <div>
                    <h3
                      className={`font-semibold ${textPrimary}`}
                    >
                      Problem Solving
                    </h3>

                    <p
                      className={`text-xs ${textSecondary}`}
                    >
                      Overall progress
                    </p>
                  </div>
                </div>

                <div className="flex items-end gap-3">
                  <span
                    className={`text-4xl font-bold ${textPrimary}`}
                  >
                    {data.stats.totalSolved}
                  </span>

                  <span
                    className={`mb-1 text-sm ${textSecondary}`}
                  >
                    / {data.stats.totalQuestions}
                  </span>
                </div>

                <div
                  className={`mt-4 h-2 overflow-hidden rounded-full ${
                    darkMode
                      ? "bg-white/10"
                      : "bg-slate-200"
                  }`}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                    style={{
                      width: `${getPercentage(
                        data.stats.totalSolved,
                        data.stats.totalQuestions,
                      )}%`,
                    }}
                  />
                </div>

                <p
                  className={`mt-3 text-xs ${textSecondary}`}
                >
                  {getPercentage(
                    data.stats.totalSolved,
                    data.stats.totalQuestions,
                  )}
                  % of all available problems solved
                </p>
              </div>

              {/* Consistency */}
              <div
                className={`rounded-3xl border p-6 ${cardClass}`}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                    <Flame
                      size={19}
                      className="text-orange-400"
                    />
                  </div>

                  <div>
                    <h3
                      className={`font-semibold ${textPrimary}`}
                    >
                      Consistency
                    </h3>

                    <p
                      className={`text-xs ${textSecondary}`}
                    >
                      Keep showing up
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p
                      className={`text-3xl font-bold ${textPrimary}`}
                    >
                      {data.activity.activeDays}
                    </p>

                    <p
                      className={`mt-1 text-xs ${textSecondary}`}
                    >
                      Active Days
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-3xl font-bold ${textPrimary}`}
                    >
                      {data.activity.totalSubmissions}
                    </p>

                    <p
                      className={`mt-1 text-xs ${textSecondary}`}
                    >
                      Submissions
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-6 border-t pt-4 ${
                    darkMode
                      ? "border-white/10"
                      : "border-slate-200"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${textPrimary}`}
                  >
                    Consistency over perfection.
                  </p>

                  <p
                    className={`mt-1 text-xs ${textSecondary}`}
                  >
                    Every problem solved is another step
                    forward.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
              <p
                className={`text-xs ${textSecondary}`}
              >
                Solving problems • Learning algorithms •
                Building consistency
              </p>

              <a
                href={`https://leetcode.com/u/${data.username}/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-500 transition hover:text-yellow-400"
              >
                View Full Profile
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeetCode;