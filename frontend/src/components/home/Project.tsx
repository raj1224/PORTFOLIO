import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  FolderOpen,
  LoaderCircle,
} from "lucide-react";

import { useProjects } from "../../hooks/useProjects";

interface ProjectsProps {
  darkMode: boolean;
}

type Filter = "All" | "Featured";

const Projects = ({ darkMode }: ProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useProjects();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Featured") {
      return projects.filter((project) => project.featured);
    }

    return projects;
  }, [projects, activeFilter]);

  return (
    <section
      id="projects"
      className={`border-b py-20 ${
        darkMode
          ? "border-white/10 bg-[#080c15]"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-500">
              My Work
            </p>

            <h2
              className={`mt-2 text-3xl font-bold sm:text-4xl ${
                darkMode ? "text-white" : "text-slate-950"
              }`}
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>

            <p
              className={`mt-3 max-w-xl text-sm ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              A few of my recent projects. Check out the live demos
              and source code.
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
            {(["All", "Featured"] as Filter[]).map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 rounded-lg border px-4 py-2.5 text-[10px] font-semibold transition ${
                    isActive
                      ? "border-indigo-500 bg-indigo-600 text-white"
                      : darkMode
                        ? "border-white/10 bg-white/[0.02] text-slate-400 hover:border-indigo-500/30 hover:text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`h-[390px] animate-pulse rounded-xl border ${
                  darkMode
                    ? "border-white/10 bg-[#0b101b]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div
                  className={`h-36 ${
                    darkMode ? "bg-white/5" : "bg-slate-100"
                  }`}
                />

                <div className="space-y-3 p-4">
                  <div
                    className={`h-4 w-2/3 rounded ${
                      darkMode ? "bg-white/10" : "bg-slate-200"
                    }`}
                  />

                  <div
                    className={`h-3 w-full rounded ${
                      darkMode ? "bg-white/10" : "bg-slate-200"
                    }`}
                  />

                  <div
                    className={`h-3 w-5/6 rounded ${
                      darkMode ? "bg-white/10" : "bg-slate-200"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {isError && !isLoading && (
          <div
            className={`mt-10 flex min-h-[220px] flex-col items-center justify-center rounded-xl border ${
              darkMode
                ? "border-red-500/20 bg-red-500/5"
                : "border-red-200 bg-red-50"
            }`}
          >
            <FolderOpen
              size={32}
              className="text-red-400"
            />

            <p
              className={`mt-4 text-sm font-semibold ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Failed to load projects
            </p>

            <p
              className={`mt-1 text-xs ${
                darkMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Please try again later.
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!isLoading &&
          !isError &&
          filteredProjects.length === 0 && (
            <div
              className={`mt-10 flex min-h-[220px] flex-col items-center justify-center rounded-xl border ${
                darkMode
                  ? "border-white/10 bg-[#0b101b]"
                  : "border-slate-200 bg-white"
              }`}
            >
              <FolderOpen
                size={32}
                className="text-indigo-500"
              />

              <p
                className={`mt-4 text-sm font-semibold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                No projects found
              </p>

              <p
                className={`mt-1 text-xs ${
                  darkMode ? "text-slate-500" : "text-slate-500"
                }`}
              >
                Projects will appear here once they are published.
              </p>
            </div>
          )}

        {/* PROJECTS */}
        {!isLoading &&
          !isError &&
          filteredProjects.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProjects.map((project) => (
                <article
                  key={project._id}
                  className={`group overflow-hidden rounded-xl border transition duration-300 hover:-translate-y-1 ${
                    darkMode
                      ? "border-white/10 bg-[#0b101b] hover:border-indigo-500/40"
                      : "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5"
                  }`}
                >
                  {/* IMAGE */}
                  <div
                    className={`relative h-36 overflow-hidden ${
                      darkMode
                        ? "bg-[#111827]"
                        : "bg-slate-100"
                    }`}
                  >
                    {project.thumbnail?.url ? (
                      <img
                        src={project.thumbnail.url}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-500/10 to-transparent" />

                        <div className="flex h-full items-center justify-center">
                          <div
                            className={`rounded-lg border px-5 py-3 font-mono text-xs ${
                              darkMode
                                ? "border-white/10 bg-[#080c15] text-indigo-400"
                                : "border-slate-200 bg-white text-indigo-600"
                            }`}
                          >
                            {"< "}
                            {project.title}
                            {" />"}
                          </div>
                        </div>
                      </>
                    )}

                    {/* FEATURED */}
                    {project.featured && (
                      <span className="absolute left-3 top-3 rounded-full bg-indigo-600 px-2.5 py-1 text-[8px] font-bold text-white">
                        Featured
                      </span>
                    )}

                    {/* CATEGORY */}
                    <span className="absolute bottom-3 right-3 rounded-md border border-white/10 bg-black/50 px-2 py-1 text-[8px] font-medium text-white backdrop-blur">
                      {project.shortDescription
                        ? "Project"
                        : "Web App"}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`text-base font-bold ${
                          darkMode
                            ? "text-white"
                            : "text-slate-900"
                        }`}
                      >
                        {project.title}
                      </h3>

                      <a
                        href={`/projects/${project.slug}`}
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                          darkMode
                            ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                        aria-label={`View ${project.title}`}
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    </div>

                    <p
                      className={`mt-2 line-clamp-3 text-[11px] leading-5 ${
                        darkMode
                          ? "text-slate-500"
                          : "text-slate-500"
                      }`}
                    >
                      {project.shortDescription ||
                        project.description}
                    </p>

                    {/* TECH STACK */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-md px-2 py-1 text-[8px] font-medium ${
                            darkMode
                              ? "bg-white/5 text-slate-400"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-4 flex gap-2">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 items-center justify-center gap-1 rounded-md bg-indigo-600 px-2 py-2 text-[9px] font-semibold text-white transition hover:bg-indigo-500"
                        >
                          <ExternalLink size={12} />
                          Live Demo
                        </a>
                      ) : (
                        <span
                          className={`flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-2 text-[9px] font-semibold ${
                            darkMode
                              ? "bg-white/5 text-slate-500"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          <LoaderCircle size={11} />
                          Live Soon
                        </span>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex flex-1 items-center justify-center gap-1 rounded-md border px-2 py-2 text-[9px] font-semibold transition ${
                            darkMode
                              ? "border-white/10 text-slate-300 hover:bg-white/5"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span className="font-bold text-[10px]">GH</span>
View Code
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

        {/* VIEW ALL */}
        {!isLoading &&
          !isError &&
          projects.length > 0 && (
            <div className="mt-7 flex justify-center">
              <a
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-500 transition hover:text-indigo-400"
              >
                View all projects
                <ArrowUpRight size={14} />
              </a>
            </div>
          )}
      </div>
    </section>
  );
};

export default Projects;