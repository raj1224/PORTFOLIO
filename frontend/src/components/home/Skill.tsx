import { useState } from "react";
import {
  Code2,
  Database,
  GitBranch,
  Server,
  Settings2,
  Wrench,
} from "lucide-react";

interface SkillsProps {
  darkMode: boolean;
}

type CategoryName =
  | "All"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Tools & DevOps"
  | "Others";

interface Skill {
  name: string;
  image: string;
}

interface SkillCategory {
  title: Exclude<CategoryName, "All">;
  icon: typeof Code2;
  skills: Skill[];
}

const Skills = ({ darkMode }: SkillsProps) => {
  const [activeCategory, setActiveCategory] =
    useState<CategoryName>("All");

  const categories: SkillCategory[] = [
    {
      title: "Frontend",
      icon: Code2,
      skills: [
        {
          name: "JavaScript",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        },
        {
          name: "TypeScript",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        },
        {
          name: "React",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        },
        {
          name: "Tailwind CSS",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        },
        {
          name: "HTML5",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        },
        {
          name: "CSS3",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        },
        {
          name: "React Router",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg",
        },
        {
          name: "Vite",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
        },
      ],
    },

    {
      title: "Backend",
      icon: Server,
      skills: [
        {
          name: "Node.js",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Express.js",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        },
        {
          name: "REST API",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
        },
        {
          name: "JWT",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jsonwebtokens/jsonwebtokens-original.svg",
        },
        {
          name: "Socket.io",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",
        },
        {
          name: "Zod",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zod/zod-original.svg",
        },
        {
          name: "Multer",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Cloudinary",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudinary/cloudinary-original.svg",
        },
      ],
    },

    {
      title: "Database",
      icon: Database,
      skills: [
        {
          name: "MongoDB",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        },
        {
          name: "Mongoose",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg",
        },
        {
          name: "PostgreSQL",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        },
        {
          name: "Prisma",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
        },
        {
          name: "Redis",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
        },
      ],
    },

    {
      title: "Tools & DevOps",
      icon: Settings2,
      skills: [
        {
          name: "Git",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        },
        {
          name: "GitHub",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        },
        {
          name: "Docker",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        },
        {
          name: "Docker Compose",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        },
        {
          name: "Postman",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
        },
        {
          name: "Vercel",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
        },
        {
          name: "AWS",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        },
        {
          name: "Linux",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
        },
      ],
    },

    {
      title: "Others",
      icon: Wrench,
      skills: [
        {
          name: "VS Code",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
        },
        {
          name: "Figma",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
        },
        {
          name: "GitHub Actions",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
        },
        {
          name: "Nginx",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
        },
        {
          name: "TanStack Query",
          image:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactquery/reactquery-original.svg",
        },
      ],
    },
  ];

  const filteredCategories =
    activeCategory === "All"
      ? categories
      : categories.filter(
          (category) => category.title === activeCategory,
        );

  return (
    <section
      id="skills"
      className={`border-b py-20 ${
        darkMode
          ? "border-white/10 bg-[#080c15]"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-500">
              Technologies I use
            </p>

            <h2
              className={`mt-2 text-4xl font-bold tracking-tight ${
                darkMode
                  ? "text-white"
                  : "text-slate-950"
              }`}
            >
              Tech{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Stack
              </span>
            </h2>

            <p
              className={`mt-3 max-w-xl text-sm ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-600"
              }`}
            >
              Technologies and tools I use to build
              modern, scalable and production-ready
              applications.
            </p>
          </div>

          {/* ================= FILTERS ================= */}

          {/* FILTERS */}

<div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
  {[
    "All",
    "Frontend",
    "Backend",
    "Database",
    "Tools & DevOps",
    "Others",
  ].map((category) => {
    const isActive = activeCategory === category;

    return (
      <button
        key={category}
        type="button"
        onClick={() =>
          setActiveCategory(category as CategoryName)
        }
        className={`shrink-0 rounded-lg border px-4 py-2.5 text-[11px] font-semibold transition-all ${
          isActive
            ? "border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
            : darkMode
              ? "border-white/10 bg-white/[0.02] text-slate-400 hover:border-indigo-500/30 hover:bg-white/[0.04] hover:text-white"
              : "border-slate-200 bg-white text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
        }`}
      >
        {category}
      </button>
    );
  })}
</div>
        </div>

        {/* ================= TECH STACK ================= */}

        <div className="mt-10">
          <div
            className={`grid gap-5 ${
              filteredCategories.length === 1
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
            }`}
          >
            {filteredCategories.map((category) => {
              const CategoryIcon = category.icon;

              return (
                <div
                  key={category.title}
                  className={`h-[480px] rounded-2xl border p-6 transition-all duration-300 ${
                    darkMode
                      ? "border-white/10 bg-[#0b101b] hover:border-indigo-500/30"
                      : "border-slate-200 bg-white hover:border-indigo-300"
                  }`}
                >
                  {/* CATEGORY HEADER */}

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        darkMode
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      <CategoryIcon size={20} />
                    </div>

                    <div>
                      <h3
                        className={`text-base font-bold ${
                          darkMode
                            ? "text-white"
                            : "text-slate-900"
                        }`}
                      >
                        {category.title}
                      </h3>

                      <p
                        className={`mt-0.5 text-[10px] ${
                          darkMode
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      >
                        {category.skills.length} technologies
                      </p>
                    </div>
                  </div>

                  {/* ================= TECHNOLOGIES ================= */}

                  <div className="mt-5">
                    <div
                      className={`max-h-[330px] overflow-y-auto pr-2 ${
                        darkMode
                          ? "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
                          : "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300"
                      }`}
                    >
                      <div className="space-y-1.5">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className={`group flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-200 ${
                              darkMode
                                ? "border-transparent hover:border-white/10 hover:bg-white/[0.04]"
                                : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {/* LOGO */}

                            <div
                              className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg border ${
                                darkMode
                                  ? "border-white/10 bg-white/[0.03]"
                                  : "border-slate-200 bg-white"
                              }`}
                            >
                              <img
                                src={skill.image}
                                alt={skill.name}
                                className="h-5 w-5 object-contain"
                                loading="lazy"
                              />
                            </div>

                            {/* TECHNOLOGY NAME */}

                            <span
                              className={`text-[11px] font-semibold transition-colors ${
                                darkMode
                                  ? "text-slate-300 group-hover:text-white"
                                  : "text-slate-700 group-hover:text-slate-950"
                              }`}
                            >
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM MESSAGE ================= */}

        <div
          className={`mt-8 flex min-h-[60px] items-center justify-center gap-3 rounded-xl border px-5 ${
            darkMode
              ? "border-white/10 bg-[#0b101b]"
              : "border-slate-200 bg-white"
          }`}
        >
          <GitBranch
            size={15}
            className="text-indigo-500"
          />

          <span
            className={`text-[11px] font-semibold ${
              darkMode
                ? "text-slate-300"
                : "text-slate-700"
            }`}
          >
            Always learning
          </span>

          <span className="text-slate-600">
            •
          </span>

          <span
            className={`text-[11px] ${
              darkMode
                ? "text-slate-500"
                : "text-slate-500"
            }`}
          >
            Always building.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Skills;