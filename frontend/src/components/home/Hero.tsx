import {
  ArrowDown,
  ArrowRight,
  Download,
  Mail,
} from "lucide-react";

import heroImage from "../../assets/hero.png";

interface HeroProps {
  darkMode: boolean;
}

const Hero = ({ darkMode }: HeroProps) => {
  const techStack = [
    {
      name: "React",
      icon: "⚛",
      className: "text-cyan-400",
    },
    {
      name: "Node.js",
      icon: "⬢",
      className: "text-green-400",
    },
    {
      name: "MongoDB",
      icon: "◆",
      className: "text-emerald-400",
    },
    {
      name: "TypeScript",
      icon: "TS",
      className: "text-blue-400",
    },
  ];

  const stats = [
    {
      value: "50+",
      label: "Repositories",
      icon: "⌘",
    },
    {
      value: "500+",
      label: "Contributions",
      icon: "◉",
    },
    {
      value: "10+",
      label: "Major Projects",
      icon: "▣",
    },
    {
      value: "∞",
      label: "Learning",
      icon: "∞",
    },
  ];

  return (
    <section
      id="home"
      className={`relative overflow-hidden border-b ${
        darkMode
          ? "border-white/10 bg-[#070a12]"
          : "border-slate-200 bg-white"
      }`}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute left-[35%] top-[10%] h-80 w-80 rounded-full blur-[120px] ${
            darkMode ? "bg-indigo-600/15" : "bg-indigo-500/10"
          }`}
        />

        <div
          className={`absolute right-[10%] top-[30%] h-72 w-72 rounded-full blur-[120px] ${
            darkMode ? "bg-purple-600/10" : "bg-purple-500/10"
          }`}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* LEFT */}
          <div className="relative z-10">
            {/* Availability */}
            <div
              className={`mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-medium ${
                darkMode
                  ? "border-indigo-500/30 bg-indigo-500/10 text-slate-300"
                  : "border-indigo-200 bg-indigo-50 text-slate-700"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>

              Available for opportunities
            </div>

            {/* Heading */}
            <div>
              <p
                className={`text-2xl font-medium sm:text-3xl ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Hi, I'm
              </p>

              <h1
                className={`mt-1 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl ${
                  darkMode ? "text-white" : "text-slate-950"
                }`}
              >
                Raj{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
                  Kumar
                </span>
              </h1>

              <h2
                className={`mt-4 text-xl font-bold sm:text-2xl ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Full Stack Developer{" "}
                <span className="text-indigo-500">|</span>{" "}
                <span className="text-indigo-500">
                  Backend Focused
                </span>
              </h2>
            </div>

            {/* Description */}
            <p
              className={`mt-6 max-w-xl text-sm leading-7 sm:text-base ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              I build scalable, secure and production-ready web
              applications with a strong focus on backend development.
              I love turning ideas into real products.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500"
              >
                View My Projects
                <ArrowRight size={16} />
              </a>

              <a
                href="#"
                className={`inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition ${
                  darkMode
                    ? "border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08]"
                    : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                }`}
              >
                Download Resume
                <Download size={15} />
              </a>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-5">
              <a
                href="#"
                aria-label="GitHub"
                className={`text-lg font-bold transition hover:text-indigo-500 ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                GH
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className={`text-lg font-black transition hover:text-indigo-500 ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                in
              </a>

              <a
                href="#"
                aria-label="X"
                className={`text-lg font-bold transition hover:text-indigo-500 ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                𝕏
              </a>

              <a
                href="mailto:"
                aria-label="Email"
                className={`transition hover:text-indigo-500 ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative min-h-[430px] lg:min-h-[500px]">
            {/* Decorative grid */}
            <div
              className={`absolute right-5 top-10 h-[360px] w-[360px] rounded-full border ${
                darkMode
                  ? "border-indigo-500/10"
                  : "border-indigo-500/10"
              }`}
            />

            <div
              className={`absolute right-12 top-16 h-[300px] w-[300px] rounded-full border ${
                darkMode
                  ? "border-purple-500/10"
                  : "border-purple-500/10"
              }`}
            />

            {/* Main image */}
            <div className="absolute bottom-0 left-1/2 z-10 w-[330px] -translate-x-1/2 sm:w-[400px] lg:left-[48%] lg:w-[470px]">
              <img
                src={heroImage}
                alt="Raj Kumar"
                className="relative z-10 h-auto w-full object-contain drop-shadow-[0_25px_50px_rgba(79,70,229,0.25)]"
              />

              {/* Purple glow behind image */}
              <div className="absolute bottom-5 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[70px]" />
            </div>

            {/* Currently Building */}
            <div
              className={`absolute right-0 top-3 z-20 hidden w-52 rounded-xl border p-3 shadow-2xl backdrop-blur-xl sm:block ${
                darkMode
                  ? "border-indigo-500/30 bg-[#0d1220]/90"
                  : "border-indigo-200 bg-white/90"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400">
                  ◈
                </div>

                <div>
                  <p
                    className={`text-[10px] font-medium ${
                      darkMode
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    Currently Building
                  </p>

                  <p
                    className={`mt-1 text-xs font-bold ${
                      darkMode
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    QuickAI
                  </p>

                  <p
                    className={`mt-0.5 text-[10px] ${
                      darkMode
                        ? "text-slate-500"
                        : "text-slate-500"
                    }`}
                  >
                    AI-powered web application
                  </p>
                </div>
              </div>
            </div>

            {/* Tech cards */}
            <div className="absolute right-0 top-36 z-20 hidden space-y-2 sm:block">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className={`flex w-36 items-center gap-2 rounded-lg border px-3 py-2 shadow-lg backdrop-blur-md ${
                    darkMode
                      ? "border-white/10 bg-[#0c111c]/90"
                      : "border-slate-200 bg-white/90"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-[10px] font-bold ${tech.className}`}
                  >
                    {tech.icon}
                  </span>

                  <span
                    className={`text-[11px] font-semibold ${
                      darkMode
                        ? "text-slate-300"
                        : "text-slate-700"
                    }`}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Build / Deploy / Repeat */}
            <div
              className={`absolute bottom-20 left-0 z-20 hidden max-w-[130px] -rotate-6 font-serif text-2xl italic leading-tight sm:block ${
                darkMode ? "text-white" : "text-slate-700"
              }`}
            >
              Build
              <br />
              Deploy
              <br />
              Repeat
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`relative z-20 mt-6 grid overflow-hidden rounded-xl border sm:grid-cols-4 ${
            darkMode
              ? "border-white/10 bg-[#0b101b]"
              : "border-slate-200 bg-white"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex items-center gap-3 px-5 py-5 sm:justify-center ${
                index !== 0
                  ? darkMode
                    ? "border-t border-white/10 sm:border-l sm:border-t-0"
                    : "border-t border-slate-200 sm:border-l sm:border-t-0"
                  : ""
              }`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-lg text-indigo-500`}
              >
                {stat.icon}
              </div>

              <div>
                <p
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {stat.value}
                </p>

                <p
                  className={`text-[10px] ${
                    darkMode
                      ? "text-slate-500"
                      : "text-slate-500"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 flex justify-center">
          <a
            href="#about"
            className={`flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.2em] ${
              darkMode ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Scroll to explore
            <ArrowDown
              size={14}
              className="animate-bounce text-indigo-500"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;