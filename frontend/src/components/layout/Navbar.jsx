import {
    Moon,
    Sun,
    Menu,
    X,
} from "lucide-react";

import {
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    useTheme,
} from "../../context/ThemeContext";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {
        theme,
        toggleTheme,
    } = useTheme();

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="
    fixed
    left-0
    top-0
    z-50
    w-full
    px-4
">

            <nav className="
    mx-auto
    mt-3
    flex
    max-w-7xl
    items-center
    justify-between
    rounded-2xl
    border
    border-zinc-200/80
    bg-white/80
    px-5
    py-3
    shadow-sm
    backdrop-blur-xl
    dark:border-zinc-800
    dark:bg-zinc-950/80
">

                {/* Logo */}

                <Link
    to="/"
    onClick={closeMenu}
    className="
        flex
        items-center
        gap-2
        text-sm
        font-bold
        text-zinc-950
        dark:text-white
    "
>
    <span className="text-violet-600">
        &lt;/&gt;
    </span>

    Raj Kumar
</Link>


                {/* Desktop Navigation */}

                <div className="
                    hidden
                    items-center
                    gap-8
                    md:flex
                ">

                    <Link
                        to="/"
                        className="
                            text-sm
                            font-medium
                            text-zinc-600
                            transition
                            hover:text-black
                            dark:text-zinc-400
                            dark:hover:text-white
                        "
                    >
                        Home
                    </Link>

                    <Link
                        to="/about"
                        className="
                            text-sm
                            font-medium
                            text-zinc-600
                            transition
                            hover:text-black
                            dark:text-zinc-400
                            dark:hover:text-white
                        "
                    >
                        About
                    </Link>

                    <Link
                        to="/projects"
                        className="
                            text-sm
                            font-medium
                            text-zinc-600
                            transition
                            hover:text-black
                            dark:text-zinc-400
                            dark:hover:text-white
                        "
                    >
                        Projects
                    </Link>

                    <Link
                        to="/contact"
                        className="
                            text-sm
                            font-medium
                            text-zinc-600
                            transition
                            hover:text-black
                            dark:text-zinc-400
                            dark:hover:text-white
                        "
                    >
                        Contact
                    </Link>

                    {/* Theme */}

                    <button
                        onClick={toggleTheme}
                        className="
                            rounded-full
                            border
                            border-zinc-200
                            bg-white
                            p-2
                            text-zinc-700
                            transition
                            hover:bg-zinc-100
                            dark:border-zinc-800
                            dark:bg-zinc-900
                            dark:text-zinc-200
                            dark:hover:bg-zinc-800
                        "
                        aria-label="Toggle theme"
                    >

                        {theme === "dark" ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}

                    </button>

                </div>


                {/* Mobile Controls */}

                <div className="flex items-center gap-3 md:hidden">

                    <button
                        onClick={toggleTheme}
                        className="
                            rounded-full
                            border
                            border-zinc-200
                            p-2
                            dark:border-zinc-800
                        "
                    >
                        {theme === "dark" ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>

                    <button
                        onClick={() =>
                            setIsMenuOpen(!isMenuOpen)
                        }
                        className="
                            rounded-lg
                            border
                            border-zinc-200
                            p-2
                            dark:border-zinc-800
                        "
                    >
                        {isMenuOpen ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>

                </div>

            </nav>


            {/* Mobile Menu */}

            {isMenuOpen && (

                <div className="
                    mx-4
                    rounded-2xl
                    border
                    border-zinc-200
                    bg-white
                    p-5
                    shadow-xl
                    dark:border-zinc-800
                    dark:bg-zinc-950
                    md:hidden
                ">

                    <div className="
                        flex
                        flex-col
                        gap-5
                    ">

                        <Link
                            to="/"
                            onClick={closeMenu}
                        >
                            Home
                        </Link>

                        <Link
                            to="/about"
                            onClick={closeMenu}
                        >
                            About
                        </Link>

                        <Link
                            to="/projects"
                            onClick={closeMenu}
                        >
                            Projects
                        </Link>

                        <Link
                            to="/contact"
                            onClick={closeMenu}
                        >
                            Contact
                        </Link>

                    </div>

                </div>

            )}

        </header>
    );
};

export default Navbar;