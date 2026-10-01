import {
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";

interface ExperienceProps {
  darkMode: boolean;
}

const Experience = ({ darkMode }: ExperienceProps) => {
  const journey = [
    {
      year: "2023",
      title: "Started Web Development",
      organization: "Self Learning",
      description:
        "Started learning HTML, CSS and JavaScript and built my first frontend projects.",
      icon: Sparkles,
      type: "Learning",
    },
    {
      year: "2024",
      title: "Frontend Development",
      organization: "React & Modern UI",
      description:
        "Started working with React, Tailwind CSS, Vite and modern frontend development practices.",
      icon: BriefcaseBusiness,
      type: "Development",
    },
    {
      year: "2025",
      title: "Full Stack Development",
      organization: "MERN Stack",
      description:
        "Moved towards backend development with Node.js, Express, MongoDB, authentication and REST APIs.",
      icon: BriefcaseBusiness,
      type: "Development",
    },
    {
      year: "2026",
      title: "Building Production Projects",
      organization: "Full Stack + DevOps",
      description:
        "Building full-stack applications with TypeScript, PostgreSQL, Prisma, Docker and production-oriented architecture.",
      icon: Sparkles,
      type: "Building",
    },
  ];

  return (
    <section
      id="experience"
      className={`border-b py-20 ${
        darkMode
          ? "border-white/10 bg-[#070a12]"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER */}
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-500">
            My Journey
          </p>

          <h2
            className={`mt-2 text-3xl font-bold sm:text-4xl ${
              darkMode ? "text-white" : "text-slate-950"
            }`}
          >
            Development{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>

          <p
            className={`mt-3 max-w-xl text-sm leading-6 ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            A timeline of how I started with web development and
            gradually moved towards full-stack development.
          </p>
        </div>

        {/* JOURNEY */}
        <div className="relative mt-12">
          {/* TIMELINE LINE */}
          <div
            className={`absolute left-[23px] top-6 hidden h-[calc(100%-48px)] w-px sm:block ${
              darkMode ? "bg-white/10" : "bg-slate-200"
            }`}
          />

          <div className="space-y-8">
            {journey.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.year}
                  className="relative grid gap-5 sm:grid-cols-[48px_110px_1fr] sm:items-start"
                >
                  {/* ICON */}
                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border ${
                      darkMode
                        ? "border-indigo-500/20 bg-[#0b101b] text-indigo-400"
                        : "border-indigo-100 bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    <Icon size={19} />
                  </div>

                  {/* YEAR */}
                  <div className="sm:pt-3">
                    <span
                      className={`text-xs font-bold ${
                        darkMode
                          ? "text-indigo-400"
                          : "text-indigo-600"
                      }`}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div
                    className={`rounded-2xl border p-5 transition duration-300 ${
                      darkMode
                        ? "border-white/10 bg-[#0b101b] hover:border-indigo-500/30"
                        : "border-slate-200 bg-slate-50 hover:border-indigo-200"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3
                          className={`text-base font-bold ${
                            darkMode
                              ? "text-white"
                              : "text-slate-900"
                          }`}
                        >
                          {item.title}
                        </h3>

                        <p
                          className={`mt-1 text-xs font-medium ${
                            darkMode
                              ? "text-indigo-400"
                              : "text-indigo-600"
                          }`}
                        >
                          {item.organization}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full border px-2.5 py-1 text-[9px] font-semibold ${
                          darkMode
                            ? "border-white/10 bg-white/[0.03] text-slate-400"
                            : "border-slate-200 bg-white text-slate-500"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>

                    <p
                      className={`mt-4 max-w-2xl text-[11px] leading-5 ${
                        darkMode
                          ? "text-slate-500"
                          : "text-slate-600"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* EDUCATION / LOCATION */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div
            className={`rounded-2xl border p-5 ${
              darkMode
                ? "border-white/10 bg-[#0b101b]"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  darkMode
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                <GraduationCap size={19} />
              </div>

              <div>
                <p
                  className={`text-[10px] uppercase tracking-wider ${
                    darkMode
                      ? "text-slate-500"
                      : "text-slate-400"
                  }`}
                >
                  Education
                </p>

                <h3
                  className={`mt-0.5 text-sm font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  B.Tech — Electronics & Communication
                </h3>
              </div>
            </div>

            <p
              className={`mt-4 text-[11px] ${
                darkMode ? "text-slate-500" : "text-slate-600"
              }`}
            >
              JSS Academy of Technical Education, Noida
            </p>
          </div>

          <div
            className={`rounded-2xl border p-5 ${
              darkMode
                ? "border-white/10 bg-[#0b101b]"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  darkMode
                    ? "bg-purple-500/10 text-purple-400"
                    : "bg-purple-50 text-purple-600"
                }`}
              >
                <MapPin size={19} />
              </div>

              <div>
                <p
                  className={`text-[10px] uppercase tracking-wider ${
                    darkMode
                      ? "text-slate-500"
                      : "text-slate-400"
                  }`}
                >
                  Based In
                </p>

                <h3
                  className={`mt-0.5 text-sm font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  India
                </h3>
              </div>
            </div>

            <p
              className={`mt-4 text-[11px] ${
                darkMode ? "text-slate-500" : "text-slate-600"
              }`}
            >
              Open to learning, building and new opportunities.
            </p>
          </div>
        </div>

        {/* BOTTOM MESSAGE */}
        <div
          className={`mt-8 flex items-center justify-center gap-2 rounded-xl border px-5 py-4 ${
            darkMode
              ? "border-white/10 bg-[#0b101b]"
              : "border-slate-200 bg-white"
          }`}
        >
          <CalendarDays size={14} className="text-indigo-500" />

          <span
            className={`text-[11px] font-semibold ${
              darkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Learning never stops.
          </span>

          <span className="text-slate-600">•</span>

          <span
            className={`text-[11px] ${
              darkMode ? "text-slate-500" : "text-slate-500"
            }`}
          >
            Building something better every day.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Experience;