import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// Public
import Hero from "../components/home/Hero";
import Projects from "../components/home/Project";

// Admin
import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminCurrentStatus from "../pages/admin/CurrentStatus";

interface AppRoutesProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const AppRoutes = ({
  darkMode,
  setDarkMode,
}: AppRoutesProps) => {
  return (
    <Routes>
      {/* =====================================
          PUBLIC
      ===================================== */}

      <Route
        path="/"
        element={
          <Hero
            darkMode={darkMode}
          />
        }
      />

      <Route
        path="/projects"
        element={
          <Projects
            darkMode={darkMode}
          />
        }
      />

      {/* =====================================
          ADMIN
      ===================================== */}

      <Route
        path="/admin"
        element={
          <AdminLayout
            darkMode={true}
          />
        }
      >
        {/* /admin */}

        <Route
          index
          element={
            <AdminDashboard />
          }
        />

        {/* /admin/dashboard */}

        <Route
          path="dashboard"
          element={
            <AdminDashboard />
          }
        />

        {/* /admin/current-status */}

        <Route
          path="current-status"
          element={
            <AdminCurrentStatus />
          }
        />
      </Route>

      {/* =====================================
          FALLBACK
      ===================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;