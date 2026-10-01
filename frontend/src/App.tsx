import { Moon, Sun, Mail } from "lucide-react";
import { useState } from "react";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Skills from "./components/home/Skill";
import Projects from "./components/home/Project";
import Experience from "./components/home/Experience";
import GitHub from "./components/home/Github";
import LeetCode from "./components/home/Leetcode";
import Contact from "./components/home/Contact";
import Footer from "./components/layout/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-[#070a12] text-white"
          : "min-h-screen bg-white text-slate-950"
      }
    >
      {/* NAVBAR */}
      <Navbar
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>

      {/* HERO */}
      <main>
        <Hero darkMode={darkMode} />

        {/* STATS */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div
            className={
              darkMode
                ? "grid grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.03] md:grid-cols-4"
                : "grid grid-cols-2 rounded-2xl border border-slate-200 bg-slate-50 md:grid-cols-4"
            }
          >
            {[
              ["50+", "Repositories"],
              ["500+", "Contributions"],
              ["10+", "Major Projects"],
              ["∞", "Learning"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="border-b border-white/10 p-7 text-center last:border-0 md:border-b-0 md:border-r"
              >
                <p className="text-3xl font-bold text-indigo-500">
                  {number}
                </p>

                <p
                  className={
                    darkMode
                      ? "mt-2 text-sm text-slate-400"
                      : "mt-2 text-sm text-slate-500"
                  }
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <About darkMode={darkMode} />

        {/* SKILLS */}
        <Skills darkMode={darkMode} />

        {/* PROJECTS */}
        <Projects darkMode={darkMode} />

        {/* EXPERIENCE */}
        <Experience darkMode={darkMode} />

        {/* GITHUB */}
        <GitHub darkMode={darkMode} />

        {/* LEETCODE */}
        <LeetCode darkMode={darkMode} />

        {/* CONTACT */}
        <Contact darkMode={darkMode} />
      </main>

      {/* FOOTER */}
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;