import {
  Activity,
  Code2,
  FolderKanban,
  Layers3,
  Plus,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Projects",
      value: "0",
      icon: FolderKanban,
      description: "All portfolio projects",
    },
    {
      title: "Published Projects",
      value: "0",
      icon: Layers3,
      description: "Currently visible",
    },
    {
      title: "Skills",
      value: "0",
      icon: Code2,
      description: "Active skills",
    },
    {
      title: "Current Status",
      value: "0",
      icon: Activity,
      description: "Active updates",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-400">
            Overview
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Dashboard
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Manage and monitor your developer portfolio.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
        >
          <Plus size={17} />
          Add Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-[#0d111c] p-5"
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

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
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

      {/* GitHub + LeetCode */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* GitHub */}
        <div className="rounded-2xl border border-white/10 bg-[#0d111c] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white">
              <span className="text-sm font-bold">GH</span>
            </div>

            <div>
              <h3 className="font-semibold text-white">
                GitHub
              </h3>

              <p className="text-xs text-slate-500">
                Repository statistics
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-slate-500">
                Repositories
              </p>

              <p className="mt-2 text-xl font-bold text-white">
                —
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-slate-500">
                Followers
              </p>

              <p className="mt-2 text-xl font-bold text-white">
                —
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-slate-500">
                Contributions
              </p>

              <p className="mt-2 text-xl font-bold text-white">
                —
              </p>
            </div>
          </div>
        </div>

        {/* LeetCode */}
        <div className="rounded-2xl border border-white/10 bg-[#0d111c] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
              <Code2 size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                LeetCode
              </h3>

              <p className="text-xs text-slate-500">
                Problem solving statistics
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-slate-500">
                Solved
              </p>

              <p className="mt-2 text-xl font-bold text-white">
                —
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-slate-500">
                Ranking
              </p>

              <p className="mt-2 text-xl font-bold text-white">
                —
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-slate-500">
                Active Days
              </p>

              <p className="mt-2 text-xl font-bold text-white">
                —
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">
          Quick Actions
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Add Project",
            "Add Skill",
            "Update Status",
            "Edit Profile",
          ].map((action) => (
            <button
              key={action}
              type="button"
              className="rounded-2xl border border-white/10 bg-[#0d111c] p-5 text-left transition hover:border-indigo-500/40 hover:bg-indigo-500/5"
            >
              <Plus
                size={18}
                className="text-indigo-400"
              />

              <p className="mt-4 text-sm font-semibold text-white">
                {action}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Manage portfolio content
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;