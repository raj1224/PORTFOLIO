import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRound,
  Wrench,
  X,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

interface AdminLayoutProps {
  darkMode: boolean;
}

const AdminLayout = ({
  darkMode,
}: AdminLayoutProps) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const sidebarClass = darkMode
    ? "border-white/10 bg-[#090c14]"
    : "border-slate-200 bg-white";

  const textPrimary = darkMode
    ? "text-white"
    : "text-slate-900";

  const textSecondary = darkMode
    ? "text-slate-400"
    : "text-slate-500";

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Projects",
      path: "/admin/projects",
      icon: FolderKanban,
    },
    {
      label: "Skills",
      path: "/admin/skills",
      icon: Wrench,
    },
    {
      label: "Current Status",
      path: "/admin/current-status",
      icon: BarChart3,
    },
    {
      label: "Profile",
      path: "/admin/profile",
      icon: UserRound,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/admin/login", {
        replace: true,
      });
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-[#070a12]"
          : "bg-slate-50"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden w-64 border-r lg:flex lg:flex-col ${sidebarClass}`}
      >
        {/* Logo */}
        <div
          className={`flex h-20 items-center border-b px-6 ${
            darkMode
              ? "border-white/10"
              : "border-slate-200"
          }`}
        >
          <NavLink
            to="/admin"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
              {"</>"}
            </div>

            <div>
              <p
                className={`text-sm font-bold ${textPrimary}`}
              >
                Raj Portfolio
              </p>

              <p className="text-[10px] text-indigo-400">
                ADMIN PANEL
              </p>
            </div>
          </NavLink>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6">
          <p
            className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider ${textSecondary}`}
          >
            Management
          </p>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                        : `${textSecondary} hover:bg-indigo-500/10 hover:text-indigo-400`
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Settings */}
          <div className="mt-8">
            <p
              className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider ${textSecondary}`}
            >
              System
            </p>

            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : `${textSecondary} hover:bg-indigo-500/10 hover:text-indigo-400`
                }`
              }
            >
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`border-t p-4 ${
            darkMode
              ? "border-white/10"
              : "border-slate-200"
          }`}
        >
          <button
            type="button"
            onClick={handleLogout}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
              darkMode
                ? "text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                : "text-slate-500 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar placeholder */}
      <div className="hidden">
        <X />
      </div>

      {/* Main */}
      <main className="min-h-screen lg:pl-64">
        {/* Top bar */}
        <header
          className={`sticky top-0 z-30 flex h-20 items-center justify-between border-b px-6 backdrop-blur-xl ${
            darkMode
              ? "border-white/10 bg-[#070a12]/80"
              : "border-slate-200 bg-white/80"
          }`}
        >
          <div>
            <p
              className={`text-xs ${textSecondary}`}
            >
              Admin Panel
            </p>

            <h1
              className={`text-lg font-bold ${textPrimary}`}
            >
              Portfolio Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p
                className={`text-xs font-semibold ${textPrimary}`}
              >
                {user?.username || "Administrator"}
              </p>

              <p
                className={`text-[10px] ${textSecondary}`}
              >
                Manage your portfolio
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              {user?.username
                ? user.username
                    .slice(0, 2)
                    .toUpperCase()
                : "RK"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;