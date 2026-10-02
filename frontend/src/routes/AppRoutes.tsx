import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// Public pages
import Home from "../components/home/Hero";
import Projects from "../components/home/Project";

// Admin
import AdminLogin from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminCurrentStatus from "../pages/admin/CurrentStatus";

import AdminProjects from "../pages/admin/AdminProjects";

// Layout
import AdminLayout from "../components/layout/AdminLayout";

// Auth protection
import ProtectedAdminRoute from "../components/auth/ProtectedAdminRoute";

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

      {/* =========================
          PUBLIC ROUTES
      ========================== */}

      <Route
        path="/"
        element={
          <Home
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


      {/* =========================
          ADMIN LOGIN
      ========================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =========================
          PROTECTED ADMIN ROUTES
      ========================== */}

      <Route element={<ProtectedAdminRoute />}>

        <Route
          path="/admin"
          element={
            <AdminLayout
              darkMode={true}
            />
          }
        >

          {/* /admin → /admin/dashboard */}
          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />

          {/* Dashboard */}
          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
  path="projects"
  element={<AdminProjects />}
/>

          {/* Current Status */}
          <Route
            path="current-status"
            element={
              <AdminCurrentStatus />
            }
          />

        </Route>

      </Route>


      {/* =========================
          UNKNOWN ROUTES
      ========================== */}

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