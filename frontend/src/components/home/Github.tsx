import {
  ArrowUpRight,
  GitBranch,
  GitCommitHorizontal,
  Star,
  Users,
  ExternalLink,
  GitFork,
} from "lucide-react";

import {
  useGitHubProfile,
  useGitHubRepositories,
  useGitHubContributions,
} from "../../hooks/useGithub";

interface GitHubProps {
  darkMode: boolean;
}

const GitHub = ({ darkMode }: GitHubProps) => {
  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
  } = useGitHubProfile();

  const {
    data: repositories,
    isLoading: repositoriesLoading,
  } = useGitHubRepositories();

  const {
    data: contributions,
    isLoading: contributionsLoading,
    isError: contributionsError,
  } = useGitHubContributions();

  const stats = [
    {
      label: "Repositories",
      value: profile?.public_repos ?? 0,
      icon: GitBranch,
    },
    {
      label: "Contributions",
      value: contributions?.totalContributions ?? 0,
      icon: GitCommitHorizontal,
    },
    {
      label: "Followers",
      value: profile?.followers ?? 0,
      icon: Users,
    },
    {
      label: "Stars",
      value:
        repositories?.reduce(
          (total, repo) => total + repo.stargazers_count,
          0,
        ) ?? 0,
      icon: Star,
    },
  ];

  const contributionDays =
    contributions?.weeks.flatMap((week) => week.contributionDays) ?? [];

  const getContributionClass = (count: number) => {
    if (darkMode) {
      if (count === 0) return "bg-white/[0.03]";
      if (count <= 2) return "bg-indigo-950";
      if (count <= 5) return "bg-indigo-800";
      if (count <= 10) return "bg-indigo-600";
      return "bg-indigo-400";
    }

    if (count === 0) return "bg-slate-100";
    if (count <= 2) return "bg-indigo-100";
    if (count <= 5) return "bg-indigo-200";
    if (count <= 10) return "bg-indigo-300";

    return "bg-indigo-500";
  };

  const recentRepositories = repositories?.slice(0, 4) ?? [];

  return (
    <section
      id="github"
      className={`border-b py-20 ${
        darkMode
          ? "border-white/10 bg-[#080c15]"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-500">
              Open Source
            </p>

            <h2
              className={`mt-2 text-3xl font-bold sm:text-4xl ${
                darkMode ? "text-white" : "text-slate-950"
              }`}
            >
              GitHub{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Activity
              </span>
            </h2>

            <p
              className={`mt-3 max-w-xl text-sm ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              My open-source activity, contributions and development
              statistics.
            </p>
          </div>

          {profile?.html_url && (
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex w-fit items-center gap-2 rounded-lg border px-4 py-2.5 text-[11px] font-semibold transition ${
                darkMode
                  ? "border-white/10 bg-white/[0.02] text-slate-300 hover:border-indigo-500/30 hover:bg-white/5 hover:text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              <span className="font-bold">GH</span>
              View GitHub
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>

        {/* PROFILE ERROR */}
        {profileError && (
          <div
            className={`mt-8 rounded-xl border p-5 text-sm ${
              darkMode
                ? "border-red-500/20 bg-red-500/5 text-red-400"
                : "border-red-200 bg-red-50 text-red-600"
            }`}
          >
            Unable to load GitHub profile.
          </div>
        )}

        {/* PROFILE */}
        {profile && (
          <div
            className={`mt-10 flex flex-col gap-5 rounded-2xl border p-5 sm:flex-row sm:items-center ${
              darkMode
                ? "border-white/10 bg-[#0b101b]"
                : "border-slate-200 bg-white"
            }`}
          >
            <img
              src={profile.avatar_url}
              alt={profile.name ?? profile.login}
              className="h-16 w-16 rounded-full border border-indigo-500/20 object-cover"
            />

            <div className="min-w-0 flex-1">
              <h3
                className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {profile.name ?? profile.login}
              </h3>

              <p className="mt-1 text-xs text-indigo-500">
                @{profile.login}
              </p>

              {profile.bio && (
                <p
                  className={`mt-2 text-xs ${
                    darkMode ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  {profile.bio}
                </p>
              )}
            </div>

            <div
              className={`text-xs ${
                darkMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Following{" "}
              <span className="font-semibold text-indigo-500">
                {profile.following}
              </span>
            </div>
          </div>
        )}

        {/* STATS */}
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`rounded-xl border p-5 ${
                  darkMode
                    ? "border-white/10 bg-[#0b101b]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      darkMode
                        ? "bg-indigo-500/10 text-indigo-400"
                        : "bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    <Icon size={17} />
                  </div>

                  <span
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {profileLoading ||
                    contributionsLoading ||
                    repositoriesLoading
                      ? "..."
                      : stat.value}
                  </span>
                </div>

                <p
                  className={`mt-4 text-[10px] font-medium ${
                    darkMode ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* CONTRIBUTION GRAPH */}
        <div
          className={`mt-5 rounded-2xl border p-5 sm:p-6 ${
            darkMode
              ? "border-white/10 bg-[#0b101b]"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3
                className={`text-sm font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Contribution Activity
              </h3>

              <p
                className={`mt-1 text-[10px] ${
                  darkMode ? "text-slate-500" : "text-slate-500"
                }`}
              >
                {contributions?.totalContributions ?? 0} contributions
              </p>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <span
                className={`text-[9px] ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Less
              </span>

              {[0, 1, 3, 7, 12].map((count) => (
                <span
                  key={count}
                  className={`h-2.5 w-2.5 rounded-sm ${getContributionClass(
                    count,
                  )}`}
                />
              ))}

              <span
                className={`text-[9px] ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                More
              </span>
            </div>
          </div>

          {contributionsError ? (
            <div className="py-12 text-center text-xs text-red-400">
              Unable to load contribution data.
            </div>
          ) : contributionsLoading ? (
            <div className="py-12 text-center text-xs text-slate-500">
              Loading contribution activity...
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto pb-2">
              <div className="grid min-w-[700px] grid-flow-col grid-rows-7 gap-1">
                {contributionDays.map((day) => (
                  <span
                    key={day.date}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                    className={`h-2.5 w-2.5 rounded-[2px] ${getContributionClass(
                      day.contributionCount,
                    )}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RECENT REPOSITORIES */}
        <div className="mt-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3
                className={`text-sm font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Recent Repositories
              </h3>

              <p
                className={`mt-1 text-[10px] ${
                  darkMode ? "text-slate-500" : "text-slate-500"
                }`}
              >
                Recently updated GitHub projects
              </p>
            </div>
          </div>

          {repositoriesLoading ? (
            <div className="grid gap-3 md:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`h-32 animate-pulse rounded-xl border ${
                    darkMode
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-slate-200 bg-white"
                  }`}
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {recentRepositories.map((repo) => (
                <div
                  key={repo.id}
                  className={`rounded-xl border p-5 transition ${
                    darkMode
                      ? "border-white/10 bg-[#0b101b] hover:border-indigo-500/30"
                      : "border-slate-200 bg-white hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4
                        className={`truncate text-sm font-bold ${
                          darkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {repo.name}
                      </h4>

                      <p
                        className={`mt-2 line-clamp-2 text-[11px] leading-5 ${
                          darkMode ? "text-slate-500" : "text-slate-500"
                        }`}
                      >
                        {repo.description ?? "No description available."}
                      </p>
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-slate-400 transition hover:text-indigo-500"
                      aria-label={`Open ${repo.name} on GitHub`}
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-[10px]">
                    {repo.language && (
                      <span
                        className={
                          darkMode ? "text-slate-400" : "text-slate-500"
                        }
                      >
                        {repo.language}
                      </span>
                    )}

                    <span className="flex items-center gap-1 text-slate-500">
                      <Star size={11} />
                      {repo.stargazers_count}
                    </span>

                    <span className="flex items-center gap-1 text-slate-500">
                      <GitFork size={11} />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM */}
        <div
          className={`mt-5 flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between ${
            darkMode
              ? "border-white/10 bg-[#0b101b]"
              : "border-slate-200 bg-white"
          }`}
        >
          <div>
            <p
              className={`text-sm font-bold ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Building in public
            </p>

            <p
              className={`mt-1 text-[11px] ${
                darkMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Code, projects and experiments are continuously evolving.
            </p>
          </div>

          {profile?.html_url && (
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-[10px] font-semibold text-white transition hover:bg-indigo-500"
            >
              <span className="font-bold">GH</span>
              Visit Profile
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHub;