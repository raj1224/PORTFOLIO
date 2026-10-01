import { Moon, Sun } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  return (
    <header
      className={
        darkMode
          ? "border-b border-white/10"
          : "border-b border-slate-200"
      }
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-500">
            {"</>"}
          </span>

          <span className="font-bold">
            Raj Kumar
          </span>
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-7 text-sm md:flex">
          <a href="#home" className="text-indigo-400">
            Home
          </a>

          <a
            href="#about"
            className="transition hover:text-indigo-400"
          >
            About
          </a>

          <a
            href="#skills"
            className="transition hover:text-indigo-400"
          >
            Skills
          </a>

          <a
            href="#projects"
            className="transition hover:text-indigo-400"
          >
            Projects
          </a>

          <a
            href="#experience"
            className="transition hover:text-indigo-400"
          >
            Experience
          </a>

          <a
            href="#contact"
            className="transition hover:text-indigo-400"
          >
            Contact
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={
              darkMode
                ? "rounded-full border border-white/10 p-2 hover:bg-white/10"
                : "rounded-full border border-slate-200 p-2 hover:bg-slate-100"
            }
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun size={17} />
            ) : (
              <Moon size={17} />
            )}
          </button>

          {/* Connect Button */}
          <a
            href="#contact"
            className="hidden rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 sm:block"
          >
            Let's Connect
          </a>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;