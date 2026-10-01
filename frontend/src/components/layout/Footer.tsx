import {
  ArrowUp,
  Mail,
} from "lucide-react";

interface FooterProps {
  darkMode: boolean;
}

const Footer = ({ darkMode }: FooterProps) => {
  const textPrimary = darkMode
    ? "text-white"
    : "text-slate-900";

  const textSecondary = darkMode
    ? "text-slate-500"
    : "text-slate-500";

  return (
    <footer
      className={`border-t ${
        darkMode
          ? "border-white/10 bg-[#05070d]"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Main footer */}
        <div className="flex flex-col justify-between gap-8 py-10 md:flex-row md:items-center">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="flex items-center gap-2"
            >
              <span className="text-xl font-bold text-indigo-500">
                {"</>"}
              </span>

              <span
                className={`font-bold ${textPrimary}`}
              >
                Raj Kumar
              </span>
            </a>

            <p
              className={`mt-3 max-w-sm text-xs leading-5 ${textSecondary}`}
            >
              Full Stack Developer focused on building
              scalable, modern, and user-friendly web
              applications.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-xs">
            <a
              href="#home"
              className={`transition hover:text-indigo-500 ${textSecondary}`}
            >
              Home
            </a>

            <a
              href="#about"
              className={`transition hover:text-indigo-500 ${textSecondary}`}
            >
              About
            </a>

            <a
              href="#skills"
              className={`transition hover:text-indigo-500 ${textSecondary}`}
            >
              Skills
            </a>

            <a
              href="#projects"
              className={`transition hover:text-indigo-500 ${textSecondary}`}
            >
              Projects
            </a>

            <a
              href="#leetcode"
              className={`transition hover:text-indigo-500 ${textSecondary}`}
            >
              LeetCode
            </a>

            <a
              href="#github"
              className={`transition hover:text-indigo-500 ${textSecondary}`}
            >
              GitHub
            </a>

            <a
              href="#contact"
              className={`transition hover:text-indigo-500 ${textSecondary}`}
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:your-email@example.com"
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                darkMode
                  ? "border-white/10 hover:border-indigo-500/40 hover:bg-white/5"
                  : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
              }`}
              aria-label="Email"
            >
              <Mail
                size={15}
                className="text-indigo-400"
              />
            </a>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                darkMode
                  ? "border-white/10 hover:border-indigo-500/40 hover:bg-white/5"
                  : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
              }`}
              aria-label="Back to top"
            >
              <ArrowUp
                size={15}
                className={textSecondary}
              />
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`flex flex-col gap-3 border-t py-5 text-[11px] sm:flex-row sm:items-center sm:justify-between ${
            darkMode
              ? "border-white/10"
              : "border-slate-200"
          }`}
        >
          <p className={textSecondary}>
            © {new Date().getFullYear()} Raj Kumar. All
            rights reserved.
          </p>

          <p className={textSecondary}>
            Built with React, TypeScript & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;