import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Code2,
  FolderKanban,
  Layers3,
  Loader2,
  Plus,
  RefreshCw,
  UserRound,
  Wrench,
  XCircle,
} from "lucide-react";

import { useAdminProjects } from "../../hooks/useProjects";
import {
  useGitHubProfile,
  useGitHubContributions,
} from "../../hooks/useGithub";
import { useLeetCodeDashboard } from "../../hooks/useLeetcode";
import { useAdminSkills } from "../../hooks/useSkill";
import { useAdminCurrentStatuses } from "../../hooks/useCurrent-status";

const Dashboard = () => {
  const {
    data: projects = [],
    isLoading: projectsLoading,
    isError: projectsError,
    refetch: refetchProjects,
  } = useAdminProjects();

  const {
    data: skills = [],
    isLoading: skillsLoading,
    isError: skillsError,
    refetch: refetchSkills,
  } = useAdminSkills();

  const {
    data: githubProfile,
    isLoading: githubProfileLoading,
    isError: githubProfileError,
    refetch: refetchGitHubProfile,
  } = useGitHubProfile();

  const {
    data: githubContributions,
    isLoading: githubContributionsLoading,
    isError: githubContributionsError,
    refetch: refetchGitHubContributions,
  } = useGitHubContributions();

  const {
    data: leetcode,
    isLoading: leetcodeLoading,
    isError: leetcodeError,
    refetch: refetchLeetCode,
  } = useLeetCodeDashboard();

  const {
    data: currentStatuses = [],
    isLoading: currentStatusLoading,
    isError: currentStatusError,
    refetch: refetchCurrentStatuses,
  } = useAdminCurrentStatuses();

  const isLoading =
    projectsLoading ||
    skillsLoading ||
    githubProfileLoading ||
    githubContributionsLoading ||
    leetcodeLoading ||
    currentStatusLoading;

  const hasError =
    projectsError ||
    skillsError ||
    githubProfileError ||
    githubContributionsError ||
    leetcodeError ||
    currentStatusError;

  const publishedProjects = projects.filter(
    (project) => project.status === "published"
  );

  const draftProjects = projects.filter(
    (project) => project.status === "draft"
  );

  const archivedProjects = projects.filter(
    (project) => project.status === "archived"
  );

  const visibleSkills = skills.filter((skill) => skill.isVisible);

  const hiddenSkills = skills.filter((skill) => !skill.isVisible);

  const inProgressStatuses = currentStatuses.filter(
    (item) => item.status === "in_progress"
  );

  const completedStatuses = currentStatuses.filter(
    (item) => item.status === "completed"
  );

  const planningStatuses = currentStatuses.filter(
    (item) => item.status === "planning"
  );

  const pausedStatuses = currentStatuses.filter(
    (item) => item.status === "paused"
  );

  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  const recentStatuses = [...currentStatuses]
    .sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }

      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    })
    .slice(0, 4);

  const handleRefresh = async () => {
    await Promise.all([
      refetchProjects(),
      refetchSkills(),
      refetchGitHubProfile(),
      refetchGitHubContributions(),
      refetchLeetCode(),
      refetchCurrentStatuses(),
    ]);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const getProjectStatusClass = (status: string) => {
    if (status === "published") {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }

    if (status === "draft") {
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }

    return "bg-red-500/10 text-red-400 border-red-500/20";
  };

  const getCurrentStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

      case "in_progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      case "planning":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";

      case "paused":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";

      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getCurrentStatusLabel = (status: string) => {
    switch (status) {
      case "in_progress":
        return "In Progress";

      case "completed":
        return "Completed";

      case "planning":
        return "Planning";

      case "paused":
        return "Paused";

      default:
        return status;
    }
  };

  const getCurrentStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 size={14} />;

      case "in_progress":
        return <Loader2 size={14} />;

      case "planning":
        return <CircleDot size={14} />;

      case "paused":
        return <XCircle size={14} />;

      default:
        return <CircleDot size={14} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "learning":
        return "Learning";

      case "working":
        return "Working";

      case "building":
        return "Building";

      default:
        return type;
    }
  };

  return (
    <div className="min-h-full bg-[#070a12] text-white">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-400">
            Admin Panel
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Overview of your portfolio data
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isLoading}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={isLoading ? "animate-spin" : ""}
          />

          Refresh
        </button>
      </div>

      {/* Error */}
      {hasError && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
          Some dashboard data could not be loaded. Try refreshing the
          dashboard.
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Projects */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-blue-500/20">
          <div className="mb-5 flex items-start justify-between">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <FolderKanban size={21} />
            </div>

            <span className="text-xs text-slate-500">
              Portfolio
            </span>
          </div>

          <p className="text-3xl font-bold">
            {projectsLoading ? "—" : projects.length}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Total Projects
          </p>

          <div className="mt-4 flex gap-3 text-xs">
            <span className="text-emerald-400">
              {publishedProjects.length} published
            </span>

            <span className="text-amber-400">
              {draftProjects.length} draft
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-purple-500/20">
          <div className="mb-5 flex items-start justify-between">
            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
              <Wrench size={21} />
            </div>

            <span className="text-xs text-slate-500">
              Skills
            </span>
          </div>

          <p className="text-3xl font-bold">
            {skillsLoading ? "—" : skills.length}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Total Skills
          </p>

          <div className="mt-4 flex gap-3 text-xs">
            <span className="text-emerald-400">
              {visibleSkills.length} visible
            </span>

            <span className="text-slate-500">
              {hiddenSkills.length} hidden
            </span>
          </div>
        </div>

        {/* Current Status */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-500/20">
          <div className="mb-5 flex items-start justify-between">
            <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
              <Activity size={21} />
            </div>

            <span className="text-xs text-slate-500">
              Activity
            </span>
          </div>

          <p className="text-3xl font-bold">
            {currentStatusLoading ? "—" : currentStatuses.length}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Current Status
          </p>

          <div className="mt-4 flex gap-3 text-xs">
            <span className="text-blue-400">
              {inProgressStatuses.length} active
            </span>

            <span className="text-emerald-400">
              {completedStatuses.length} completed
            </span>
          </div>
        </div>

        {/* DSA */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-emerald-500/20">
          <div className="mb-5 flex items-start justify-between">
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
              <Code2 size={21} />
            </div>

            <span className="text-xs text-slate-500">
              LeetCode
            </span>
          </div>

          <p className="text-3xl font-bold">
            {leetcodeLoading
              ? "—"
              : `${leetcode?.stats.totalSolved ?? 0}`}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Problems Solved
          </p>

          <div className="mt-4 flex gap-3 text-xs">
            <span className="text-emerald-400">
              {leetcode?.stats.easySolved ?? 0} easy
            </span>

            <span className="text-amber-400">
              {leetcode?.stats.mediumSolved ?? 0} medium
            </span>

            <span className="text-red-400">
              {leetcode?.stats.hardSolved ?? 0} hard
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                GitHub Followers
              </p>

              <p className="mt-2 text-2xl font-bold">
                {githubProfileLoading
                  ? "—"
                  : githubProfile?.followers ?? 0}
              </p>
            </div>

            <div className="text-sm font-bold text-slate-400">
              GH
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              GitHub Repositories
            </p>

            <p className="mt-2 text-2xl font-bold">
              {githubProfileLoading
                ? "—"
                : githubProfile?.public_repos ?? 0}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              GitHub Contributions
            </p>

            <p className="mt-2 text-2xl font-bold">
              {githubContributionsLoading
                ? "—"
                : githubContributions?.totalContributions ?? 0}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Active Days
            </p>

            <p className="mt-2 text-2xl font-bold">
              {leetcodeLoading
                ? "—"
                : leetcode?.activity.activeDays ?? 0}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Recent Projects */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <h2 className="font-semibold">
                Recent Projects
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest projects added to your portfolio
              </p>
            </div>

            <a
              href="/admin/projects"
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 transition hover:text-blue-300"
            >
              View All
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="divide-y divide-white/5">
            {projectsLoading ? (
              <div className="px-5 py-10 text-center text-sm text-slate-500">
                Loading projects...
              </div>
            ) : recentProjects.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <FolderKanban
                  size={28}
                  className="mx-auto text-slate-600"
                />

                <p className="mt-3 text-sm text-slate-400">
                  No projects yet
                </p>
              </div>
            ) : (
              recentProjects.map((project) => (
                <div
                  key={project._id}
                  className="flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.02]"
                >
                  <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-slate-900">
                    {project.thumbnail?.url ? (
                      <img
                        src={project.thumbnail.url}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-600">
                        <Layers3 size={18} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-medium text-white">
                        {project.title}
                      </h3>

                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${getProjectStatusClass(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {project.shortDescription ||
                        project.description}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-600">
                      {formatDate(project.createdAt)}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-slate-600"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Current Status */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <h2 className="font-semibold">
                Current Status
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                What you are currently learning or building
              </p>
            </div>

            <a
              href="/admin/current-status"
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 transition hover:text-blue-300"
            >
              Manage
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="p-5">
            {currentStatusLoading ? (
              <div className="py-8 text-center text-sm text-slate-500">
                Loading current status...
              </div>
            ) : recentStatuses.length === 0 ? (
              <div className="py-8 text-center">
                <Activity
                  size={28}
                  className="mx-auto text-slate-600"
                />

                <p className="mt-3 text-sm text-slate-400">
                  No current status added
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentStatuses.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-medium text-white">
                            {item.title}
                          </h3>

                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] capitalize text-slate-400">
                            {getTypeLabel(item.type)}
                          </span>
                        </div>

                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                          {item.description}
                        </p>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium ${getCurrentStatusClass(
                          item.status
                        )}`}
                      >
                        {getCurrentStatusIcon(item.status)}

                        {getCurrentStatusLabel(item.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Status Summary */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-blue-500/10 bg-blue-500/5 p-3">
                <p className="text-xs text-slate-500">
                  In Progress
                </p>

                <p className="mt-1 text-lg font-semibold text-blue-400">
                  {inProgressStatuses.length}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3">
                <p className="text-xs text-slate-500">
                  Completed
                </p>

                <p className="mt-1 text-lg font-semibold text-emerald-400">
                  {completedStatuses.length}
                </p>
              </div>

              <div className="rounded-xl border border-purple-500/10 bg-purple-500/5 p-3">
                <p className="text-xs text-slate-500">
                  Planning
                </p>

                <p className="mt-1 text-lg font-semibold text-purple-400">
                  {planningStatuses.length}
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-3">
                <p className="text-xs text-slate-500">
                  Paused
                </p>

                <p className="mt-1 text-lg font-semibold text-amber-400">
                  {pausedStatuses.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-5">
          <h2 className="font-semibold">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Quickly manage your portfolio
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <a
            href="/admin/projects"
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-blue-500/30 hover:bg-blue-500/5"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                <Plus size={18} />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Add Project
                </p>

                <p className="text-xs text-slate-500">
                  Create a new project
                </p>
              </div>
            </div>

            <ArrowUpRight
              size={16}
              className="text-slate-600 transition group-hover:text-blue-400"
            />
          </a>

          <a
            href="/admin/profile"
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-purple-500/30 hover:bg-purple-500/5"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
                <UserRound size={18} />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Update Profile
                </p>

                <p className="text-xs text-slate-500">
                  Manage profile information
                </p>
              </div>
            </div>

            <ArrowUpRight
              size={16}
              className="text-slate-600 transition group-hover:text-purple-400"
            />
          </a>

          <a
            href="/admin/skills"
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-emerald-500/30 hover:bg-emerald-500/5"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                <Wrench size={18} />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Manage Skills
                </p>

                <p className="text-xs text-slate-500">
                  Add or update skills
                </p>
              </div>
            </div>

            <ArrowUpRight
              size={16}
              className="text-slate-600 transition group-hover:text-emerald-400"
            />
          </a>

          <a
            href="/admin/current-status"
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-cyan-500/30 hover:bg-cyan-500/5"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
                <Activity size={18} />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Update Status
                </p>

                <p className="text-xs text-slate-500">
                  Manage current activity
                </p>
              </div>
            </div>

            <ArrowUpRight
              size={16}
              className="text-slate-600 transition group-hover:text-cyan-400"
            />
          </a>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Project Summary */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
              <FolderKanban size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                Project Overview
              </h2>

              <p className="text-xs text-slate-500">
                Current project distribution
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-slate-400">
                  Published
                </span>

                <span className="text-emerald-400">
                  {publishedProjects.length}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${
                      projects.length
                        ? (publishedProjects.length /
                            projects.length) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-slate-400">
                  Draft
                </span>

                <span className="text-amber-400">
                  {draftProjects.length}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-amber-500"
                  style={{
                    width: `${
                      projects.length
                        ? (draftProjects.length /
                            projects.length) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-slate-400">
                  Archived
                </span>

                <span className="text-red-400">
                  {archivedProjects.length}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-red-500"
                  style={{
                    width: `${
                      projects.length
                        ? (archivedProjects.length /
                            projects.length) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Summary */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
              <Wrench size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                Skills Overview
              </h2>

              <p className="text-xs text-slate-500">
                Visibility of your skills
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs text-slate-500">
                Total
              </p>

              <p className="mt-1 text-2xl font-bold">
                {skills.length}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
              <p className="text-xs text-slate-500">
                Visible
              </p>

              <p className="mt-1 text-2xl font-bold text-emerald-400">
                {visibleSkills.length}
              </p>
            </div>

            <div className="rounded-xl border border-slate-500/10 bg-slate-500/5 p-4">
              <p className="text-xs text-slate-500">
                Hidden
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-300">
                {hiddenSkills.length}
              </p>
            </div>

            <div className="rounded-xl border border-blue-500/10 bg-blue-500/5 p-4">
              <p className="text-xs text-slate-500">
                Categories
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-400">
                {new Set(skills.map((skill) => skill.category))
                  .size}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;