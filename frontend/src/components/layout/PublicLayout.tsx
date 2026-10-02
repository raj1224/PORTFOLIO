import { Outlet } from "react-router-dom";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

interface PublicLayoutProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const PublicLayout = ({
  darkMode,
  setDarkMode,
}: PublicLayoutProps) => {
  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-[#070a12] text-white"
          : "min-h-screen bg-white text-slate-950"
      }
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main>
        <Outlet />
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default PublicLayout;