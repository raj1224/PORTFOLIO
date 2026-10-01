import { Route } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";


<Route element={<AdminLayout darkMode={true} />}>
  <Route path="/admin" element={<Dashboard />} />
</Route>