import {
  Activity,
  ArrowUpRight,
  Code2,
  FolderKanban,
  Layers3,
  Plus,
  RefreshCw,
  UserRound,
  Wrench,
} from "lucide-react";

import { useAdminProjects } from "../../hooks/useProjects";
import {
  useGitHubProfile,
  useGitHubContributions,
} from "../../hooks/useGithub";
import { useLeetCodeDashboard } from "../../hooks/useLeetcode";
import { useAdminSkills } from "../../hooks/useSkill";

const Dashboard = () => {
  // ==========================================
  // PROJECTS
  // ==========================================

  const {
    data: projects = [],
    isLoading: projectsLoading,
    isError: projectsError,
    refetch: refetchProjects,
  } = useAdminProjects();

  const totalProjects = projects.length;

  const publishedProjects = projects.filter(
    (project) => project.status === "published",
  ).length;

  const draftProjects = projects.filter(
    (project) => project.status === "draft",
  ).length;

  const archivedProjects = projects.filter(
    (project) => project.status === "archived",
  ).length;

  // ==========================================
  // SKILLS
  // ==========================================

  const {
    data: skills = [],
    isLoading: skillsLoading,
    isError: skillsError,
  } = useAdminSkills();

  const totalSkills = skills.length;

  const visibleSkills = skills.filter(
    (skill) => skill.isVisible,
  ).length;

  // ==========================================
  // GITHUB
  // ==========================================

  const {
    data: githubProfile,
    isLoading: githubLoading,
    isError: githubError,
  } = useGitHubProfile();

  const {
    data: githubContributions,
    isLoading: contributionsLoading,
  } = useGitHubContributions();

  // ==========================================
  // LEETCODE
  // ==========================================

  const {
    data: leetcode,
    isLoading: leetcodeLoading,
    isError: leetcodeError,
  } = useLeetCodeDashboard();

  // ==========================================
  // DASHBOARD STATS
  // ==========================================

  const stats = [
    {
      title: "Total Projects",
      value: projectsLoading
        ? "..."
        : projectsError
          ? "!"
          : totalProjects.toString(),
      description: "All portfolio projects",
      icon: FolderKanban,
    },
    {
      title: "Published",
      value: projectsLoading
        ? "..."
        : projectsError
          ? "!"
          : publishedProjects.toString(),
      description: "Currently visible",
      icon: Layers3,
    },
    {
      title: "Skills",
      value: skillsLoading
        ? "..."
        : skillsError
          ? "!"
          : totalSkills.toString(),
      description: `${visibleSkills} currently visible`,
      icon: Wrench,
    },
    {
      title: "Current Status",
      value: "—",
      description: "Active updates",
      icon: Activity,
    },
  ];

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = () => {
    refetchProjects();
  };

  return (
    <div className="space-y-8">
      {/* ========================================
          HEADER
      ======================================== */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-400">
            Overview
          </p>

          <h1 className="mt-1 text-2xl font-bold text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage and monitor your developer portfolio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <RefreshCw size={16} />

            Refresh
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
          >
            <Plus size={17} />

            Add Project
          </button>
        </div>
      </div>

      {/* ========================================
          MAIN STATS
      ======================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-white/10 bg-[#0d111c] p-5 transition hover:border-indigo-500/30"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    {stat.title}
                  </p>

                  <p className="mt-3 text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition group-hover:bg-indigo-500/20">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* ========================================
          PROJECT OVERVIEW
      ======================================== */}

      <section className="rounded-2xl border border-white/10 bg-[#0d111c] p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Project Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current state of your portfolio projects.
            </p>
          </div>

          <a
            href="/admin/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
          >
            Manage Projects
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white/[0.03] p-4">
            <p className="text-xs text-slate-500">
              Published
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {projectsLoading
                ? "..."
                : projectsError
                  ? "!"
                  : publishedProjects}
            </p>
          </div>

          <div className="rounded-xl bg-white/[0.03] p-4">
            <p className="text-xs text-slate-500">
              Drafts
            </p>

            <p className="mt-2 text-2xl font-bold text-yellow-400">
              {projectsLoading
                ? "..."
                : projectsError
                  ? "!"
                  : draftProjects}
            </p>
          </div>

          <div className="rounded-xl bg-white/[0.03] p-4">
            <p className="text-xs text-slate-500">
              Archived
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-300">
              {projectsLoading
                ? "..."
                : projectsError
                  ? "!"
                  : archivedProjects}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          SKILLS OVERVIEW
      ======================================== */}

      <section className="rounded-2xl border border-white/10 bg-[#0d111c] p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Skills Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Skills currently managed in your portfolio.
            </p>
          </div>

          <a
            href="/admin/skills"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
          >
            Manage Skills
            <ArrowUpRight size={15} />
          </a>
        </div>

        {skillsLoading ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-20 animate-pulse rounded-xl bg-white/5"
              />
            ))}
          </div>
        ) : skillsError ? (
          <div className="mt-6 rounded-xl bg-red-500/5 p-4 text-sm text-red-400">
            Unable to load skills.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Total Skills
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {totalSkills}
              </p>
            </div>

            <div className="rounded-xl bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Visible
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-400">
                {visibleSkills}
              </p>
            </div>

            <div className="rounded-xl bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Hidden
              </p>

              <p className="mt-2 text-2xl font-bold text-yellow-400">
                {totalSkills - visibleSkills}
              </p>
            </div>

            <div className="rounded-xl bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Categories
              </p>

              <p className="mt-2 text-2xl font-bold text-indigo-400">
                {new Set(
                  skills.map((skill) => skill.category),
                ).size}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ========================================
          GITHUB + LEETCODE
      ======================================== */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* GitHub */}

        <section className="rounded-2xl border border-white/10 bg-[#0d111c] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white">
                <span className="text-sm font-bold">
                  GH
                </span>
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  GitHub
                </h2>

                <p className="text-xs text-slate-500">
                  Repository statistics
                </p>
              </div>
            </div>

            <a
              href="/#github"
              className="text-slate-500 transition hover:text-indigo-400"
            >
              <ArrowUpRight size={17} />
            </a>
          </div>

          {githubLoading ? (
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-20 animate-pulse rounded-xl bg-white/5"
                />
              ))}
            </div>
          ) : githubError ? (
            <div className="mt-6 rounded-xl bg-red-500/5 p-4 text-sm text-red-400">
              Unable to load GitHub data.
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-slate-500">
                  Repositories
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  {githubProfile?.public_repos ?? 0}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-slate-500">
                  Followers
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  {githubProfile?.followers ?? 0}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-slate-500">
                  Contributions
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  {contributionsLoading
                    ? "..."
                    : githubContributions?.totalContributions ?? 0}
                </p>
              </div>
            </div>
          )}

          {githubProfile && (
            <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
              <div>
                <p className="text-sm font-medium text-white">
                  @{githubProfile.login}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  GitHub profile connected
                </p>
              </div>

              <a
                href={githubProfile.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 transition hover:text-indigo-300"
              >
                <ArrowUpRight size={17} />
              </a>
            </div>
          )}
        </section>

        {/* LeetCode */}

        <section className="rounded-2xl border border-white/10 bg-[#0d111c] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
              <Code2 size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                LeetCode
              </h2>

              <p className="text-xs text-slate-500">
                Problem solving statistics
              </p>
            </div>
          </div>

          {leetcodeLoading ? (
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-20 animate-pulse rounded-xl bg-white/5"
                />
              ))}
            </div>
          ) : leetcodeError ? (
            <div className="mt-6 rounded-xl bg-red-500/5 p-4 text-sm text-red-400">
              Unable to load LeetCode data.
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-slate-500">
                  Solved
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  {leetcode?.stats.totalSolved ?? 0}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-slate-500">
                  Ranking
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  {leetcode?.stats.ranking
                    ? leetcode.stats.ranking.toLocaleString()
                    : "—"}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-slate-500">
                  Active Days
                </p>

                <p className="mt-2 text-xl font-bold text-white">
                  {leetcode?.activity.activeDays ?? 0}
                </p>
              </div>
            </div>
          )}

          {leetcode && (
            <div className="mt-5 border-t border-white/5 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">
                    @{leetcode.username}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {leetcode.activity.totalSubmissions.toLocaleString()}{" "}
                    total submissions
                  </p>
                </div>

                <a
                  href={`https://leetcode.com/u/${leetcode.username}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 transition hover:text-indigo-300"
                >
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ========================================
          RECENT PROJECTS
      ======================================== */}

      <section className="rounded-2xl border border-white/10 bg-[#0d111c] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Recent Projects
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest projects added to the portfolio.
            </p>
          </div>

          <a
            href="/admin/projects"
            className="text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
          >
            View all
          </a>
        </div>

        <div className="mt-6">
          {projectsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-16 animate-pulse rounded-xl bg-white/5"
                />
              ))}
            </div>
          ) : projectsError ? (
            <div className="rounded-xl bg-red-500/5 p-5 text-sm text-red-400">
              Unable to load projects.
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-12 text-center">
              <FolderKanban
                size={28}
                className="text-slate-600"
              />

              <p className="mt-4 text-sm font-medium text-slate-300">
                No projects yet
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Add your first project from the Projects section.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div
                  key={project._id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                      <FolderKanban size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {project.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {project.shortDescription ||
                          project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
                        project.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : project.status === "draft"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      {project.status}
                    </span>

                    {project.featured && (
                      <span className="hidden rounded-full bg-indigo-500/10 px-2.5 py-1 text-[10px] font-semibold text-indigo-400 sm:inline-block">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================
          QUICK ACTIONS
      ======================================== */}

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Add Project",
              icon: FolderKanban,
            },
            {
              label: "Add Skill",
              icon: Wrench,
            },
            {
              label: "Update Status",
              icon: Activity,
            },
            {
              label: "Edit Profile",
              icon: UserRound,
            },
          ].map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                type="button"
                className="group rounded-2xl border border-white/10 bg-[#0d111c] p-5 text-left transition hover:border-indigo-500/30 hover:bg-indigo-500/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition group-hover:bg-indigo-500/20">
                  <Icon size={18} />
                </div>

                <p className="mt-4 text-sm font-semibold text-white">
                  {action.label}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Manage portfolio content
                </p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;