import { Spin } from "antd";
import { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useCheckAuthQuery } from "./api/features/auth/auth-api.js";
import MainLayout from "./components/layout/main-layout.jsx";
import RequireAuth from "./components/require-auth.jsx";
import Assessments from "./pages/assessments.jsx";
import ModulePreview from "./pages/module-preview.jsx";
import ModulePreviewLayout from "./components/layout/module-preview-layout.jsx";

const Dashboard = lazy(() =>
  import("./components/dashboard/Admin/dashboard.jsx")
);
const Modules = lazy(() => import("./pages/modules.jsx"));
const ModuleBuilder = lazy(() => import("./pages/module-builder.jsx"));
const ClientDetails = lazy(() =>
  import("./components/dashboard/Admin/client-details.jsx")
);
const Settings = lazy(() =>
  import("./components/dashboard/Admin/settings.jsx")
);
const AdminSignup = lazy(() => import("./pages/admin-signup.jsx"));
const ClientSignup = lazy(() => import("./pages/client-signup.jsx"));
const ForgetPassword = lazy(() => import("./pages/forget-password.jsx"));
const LoginPage = lazy(() => import("./pages/login-page.jsx"));
const ResetPassword = lazy(() => import("./pages/reset-password.jsx"));
const SignUpPage = lazy(() => import("./pages/sign-up-page.jsx"));

const App = () => {
  const { isLoading } = useCheckAuthQuery();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Routes that use the default MainLayout */}
        <Route element={<MainLayout />}>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<SignUpPage />} path="/signup" />
          <Route element={<ClientSignup />} path="/client_signup" />
          <Route element={<ForgetPassword />} path="/forget_password" />
          <Route element={<ResetPassword />} path="/reset_password" />
          <Route element={<AdminSignup />} path="/admin_signup" />
          <Route element={<RequireAuth />}>
            <Route element={<Dashboard />} path="/" />
            <Route element={<Modules />} path="/modules/:assessment_id" />
            <Route element={<ModuleBuilder />} path="/edit_module/:module_id" />
            <Route element={<ClientDetails />} path="/clients" />
            <Route element={<Settings />} path="/settings" />
            <Route element={<Assessments />} path="/assessments" />
          </Route>
        </Route>

        <Route element={<ModulePreviewLayout />}>
          <Route
            element={<ModulePreview />}
            path="/module_preview/:module_id"
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
