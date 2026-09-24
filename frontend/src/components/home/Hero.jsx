import { ArrowUpRight, Download } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Stat = ({ value, label }) => {
    return (
        <div className="flex-1 px-3 text-center">
            <p className="text-xl font-bold text-zinc-950 dark:text-white sm:text-2xl">
                {value}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
                {label}
            </p>
        </div>
    );
};

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">

            {/* Background Glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    -z-10
                    h-[500px]
                    w-[700px]
                    -translate-x-1/2
                    rounded-full
                    bg-violet-600/10
                    blur-[140px]
                    dark:bg-violet-600/15
                "
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">

               <div className="grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">

                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >

                        {/* Intro */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">

                            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                            Hello, I'm Raj 👋
                        </div>

                        {/* Role */}
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">
                            Full Stack Developer
                        </p>

                        {/* Heading */}
                        <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.04em] text-zinc-950 sm:text-6xl lg:text-7xl dark:text-white">

                            Building ideas

                            <br />

                            <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                                into reality.
                            </span>

                        </h1>

                        {/* Description */}
                        <p className="mt-7 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-400">
                            I'm Raj Kumar, a Full Stack Developer who loves
                            building scalable, secure and production-ready web
                            applications with a strong focus on backend development.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-wrap gap-4">

                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:bg-white dark:text-zinc-950"
                            >
                                View My Projects
                                <ArrowUpRight size={18} />
                            </Link>

                            <a
                                href="/resume.pdf"
                                download
                                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 transition hover:-translate-y-1 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                            >
                                Download Resume
                                <Download size={17} />
                            </a>

                        </div>

                        {/* Social Links */}
                        <div className="mt-7 flex items-center gap-3">

                            <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-1 hover:border-violet-400 hover:text-violet-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                            >
                                <FaGithub size={17} />
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-1 hover:border-violet-400 hover:text-violet-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                            >
                                <FaLinkedinIn size={16} />
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="X"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-1 hover:border-violet-400 hover:text-violet-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                            >
                                <FaXTwitter size={15} />
                            </a>

                            <a
                                href="mailto:your@email.com"
                                aria-label="Email"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-1 hover:border-violet-400 hover:text-violet-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                            >
                                <HiOutlineMail size={19} />
                            </a>

                        </div>

                        {/* Stats */}
                        <div className="mt-10 flex max-w-xl divide-x divide-zinc-200 rounded-2xl border border-zinc-200 bg-white/70 px-4 py-5 backdrop-blur dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/60">

                            <Stat
                                value="50+"
                                label="Repositories"
                            />

                            <Stat
                                value="500+"
                                label="Contributions"
                            />

                            <Stat
                                value="10+"
                                label="Projects"
                            />

                            <Stat
                                value="∞"
                                label="Learning"
                            />

                        </div>

                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.15,
                        }}
                        className="relative"
                    >

                        {/* Glow */}
                        <div className="absolute -right-10 top-10 -z-10 h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]" />

                        {/* Terminal */}
                        <div className="relative rounded-3xl border border-zinc-200 bg-zinc-100 p-3 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">

                            {/* Terminal Header */}
                            <div className="flex items-center justify-between rounded-t-2xl bg-zinc-200 px-4 py-3 dark:bg-zinc-800">

                                <div className="flex gap-2">

                                    <span className="h-3 w-3 rounded-full bg-red-400" />

                                    <span className="h-3 w-3 rounded-full bg-yellow-400" />

                                    <span className="h-3 w-3 rounded-full bg-green-400" />

                                </div>

                                <span className="text-xs text-zinc-500">
                                    raj@developer
                                </span>

                            </div>

                            {/* Terminal Body */}
                            <div className="min-h-[360px] rounded-b-2xl bg-[#09090b] p-6 font-mono text-sm leading-7 text-zinc-300 sm:p-8">

                                <p>
                                    <span className="text-violet-400">
                                        $
                                    </span>{" "}
                                    whoami
                                </p>

                                <p className="text-green-400">
                                    → Raj Kumar
                                </p>

                                <br />

                                <p>
                                    <span className="text-violet-400">
                                        role:
                                    </span>{" "}
                                    Full Stack Developer
                                </p>

                                <p>
                                    <span className="text-violet-400">
                                        focus:
                                    </span>{" "}
                                    Backend Development
                                </p>

                                <p>
                                    <span className="text-violet-400">
                                        location:
                                    </span>{" "}
                                    India 🇮🇳
                                </p>

                                <p>
                                    <span className="text-violet-400">
                                        status:
                                    </span>{" "}
                                    <span className="text-green-400">
                                        Available
                                    </span>
                                </p>

                                <br />

                                <p>
                                    <span className="text-violet-400">
                                        $
                                    </span>{" "}
                                    ./build-something-great
                                </p>

                                <p className="text-green-400">
                                    → Initializing project...
                                </p>

                                <p className="text-green-400">
                                    → Writing clean code...
                                </p>

                                <p className="text-green-400">
                                    → Building backend...
                                </p>

                                <p className="mt-2 animate-pulse text-white">
                                    █
                                </p>

                            </div>

                        </div>

                        {/* Floating Card */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-xl sm:block dark:border-zinc-800 dark:bg-zinc-900"
                        >

                            <p className="text-xs text-zinc-500">
                                Currently
                            </p>

                            <p className="mt-1 text-sm font-semibold">
                                Building cool stuff 🚀
                            </p>

                        </motion.div>

                        {/* Stack Badge */}
                        <div className="absolute -right-3 -top-5 hidden rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-lg sm:block dark:border-zinc-800 dark:bg-zinc-900">

                            <p className="text-xs text-zinc-500">
                                Stack
                            </p>

                            <p className="mt-1 text-xs font-semibold text-violet-600 dark:text-violet-400">
                                MERN • PostgreSQL
                            </p>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>
    );
};

export default Hero;