import {
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";

interface AboutProps {
  darkMode: boolean;
}

const About = ({ darkMode }: AboutProps) => {
  const stats = [
    {
      value: "3+",
      label: "Years Learning",
    },
    {
      value: "50+",
      label: "Projects Completed",
    },
    {
      value: "1500+",
      label: "DSA Problems",
    },
    {
      value: "∞",
      label: "To Explore",
    },
  ];

  return (
    <section
      id="about"
      className={`border-t py-20 ${
        darkMode
          ? "border-white/5 bg-[#080c15]"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Main About Card */}
        <div
          className={`overflow-hidden rounded-2xl border ${
            darkMode
              ? "border-white/10 bg-[#0b101b]"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <div className="grid lg:grid-cols-[260px_1fr]">

            {/* Profile Side */}
            <div
              className={`border-b p-6 lg:border-b-0 lg:border-r ${
                darkMode
                  ? "border-white/10"
                  : "border-slate-200"
              }`}
            >
              <div className="relative overflow-hidden rounded-xl border border-indigo-500/20">
                <img
                  src="/src/assets/hero.png"
                  alt="Raj Kumar"
                  className="h-[300px] w-full object-cover object-center"
                />

                <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/10 bg-black/70 p-3 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400">
                      <Sparkles size={16} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-white">
                        Always Learning
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Always Building
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="p-6 sm:p-8 lg:p-10">

              {/* Heading */}
              <div className="mb-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
                  About Me
                </p>

                <h2
                  className={`text-3xl font-bold sm:text-4xl ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Building with{" "}
                  <span className="text-indigo-500">
                    code & curiosity.
                  </span>
                </h2>
              </div>

              {/* Description */}
              <p
                className={`max-w-3xl text-sm leading-7 sm:text-base ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                I'm a Full Stack Developer and final year Electronics &
                Communication Engineering student at JSS Academy of
                Technical Education, Noida. I enjoy building real-world
                applications, designing robust APIs, working with databases
                and solving complex problems.
              </p>

              {/* Info Cards */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

                {/* Education */}
                <div
                  className={`rounded-xl border p-4 ${
                    darkMode
                      ? "border-white/10 bg-white/[0.02]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                    <GraduationCap size={17} />
                  </div>

                  <p
                    className={`text-xs font-semibold ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    ECE Student
                  </p>

                  <p
                    className={`mt-1 text-[11px] ${
                      darkMode ? "text-slate-500" : "text-slate-500"
                    }`}
                  >
                    JSSATE, Noida
                  </p>
                </div>

                {/* Developer */}
                <div
                  className={`rounded-xl border p-4 ${
                    darkMode
                      ? "border-white/10 bg-white/[0.02]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                    <BriefcaseBusiness size={17} />
                  </div>

                  <p
                    className={`text-xs font-semibold ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Full Stack Developer
                  </p>

                  <p
                    className={`mt-1 text-[11px] ${
                      darkMode ? "text-slate-500" : "text-slate-500"
                    }`}
                  >
                    Backend Focused
                  </p>
                </div>

                {/* Location */}
                <div
                  className={`rounded-xl border p-4 ${
                    darkMode
                      ? "border-white/10 bg-white/[0.02]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                    <MapPin size={17} />
                  </div>

                  <p
                    className={`text-xs font-semibold ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    India
                  </p>

                  <p
                    className={`mt-1 text-[11px] ${
                      darkMode ? "text-slate-500" : "text-slate-500"
                    }`}
                  >
                    Based in India
                  </p>
                </div>

                {/* Opportunities */}
                <div
                  className={`rounded-xl border p-4 ${
                    darkMode
                      ? "border-white/10 bg-white/[0.02]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10 text-pink-500">
                    <Sparkles size={17} />
                  </div>

                  <p
                    className={`text-xs font-semibold ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Open to Opportunities
                  </p>

                  <p
                    className={`mt-1 text-[11px] ${
                      darkMode ? "text-slate-500" : "text-slate-500"
                    }`}
                  >
                    Let's build together
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div
                className={`mt-6 grid grid-cols-2 overflow-hidden rounded-xl border sm:grid-cols-4 ${
                  darkMode
                    ? "border-white/10 bg-white/[0.02]"
                    : "border-slate-200 bg-white"
                }`}
              >
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`px-4 py-5 text-center ${
                      index !== 0
                        ? darkMode
                          ? "border-l border-white/10"
                          : "border-l border-slate-200"
                        : ""
                    } ${
                      index >= 2
                        ? "border-t sm:border-t-0"
                        : ""
                    }`}
                  >
                    <p
                      className={`text-2xl font-bold ${
                        darkMode
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      {stat.value}
                    </p>

                    <p
                      className={`mt-1 text-[10px] sm:text-xs ${
                        darkMode
                          ? "text-slate-500"
                          : "text-slate-500"
                      }`}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;