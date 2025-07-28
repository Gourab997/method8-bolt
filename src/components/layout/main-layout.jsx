import { message, Spin } from "antd";
import { Logout01Icon } from "hugeicons-react";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../api/features/auth/auth-api.js";
import BreadcrumbProvider from "../../context/breadcrumb/breadcrumb-provider.jsx";
import { AVATAR_COLORS } from "../../utils/constants.js";

const AuthenticatedView = lazy(() => import("./authenticated-view.jsx"));
const UnauthenticatedView = lazy(() => import("./unauthenticated-view.jsx"));

const CenteredSpinner = () => (
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

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      message.success("You have been logged out.");
      navigate("/login", { replace: true });
    } catch (err) {
      message.error(
        err.data?.message || "Failed to log out. Please try again."
      );
    }
  };

  const authMenuItems = [
    { key: "/", label: <Link to="/">Dashboard</Link> },
    { key: "/assessments", label: <Link to="/assessments">Assessments</Link> },
  ];

  const userMenuItems = [
    { key: "profile", label: user?.email, disabled: true },
    { type: "divider" },
    {
      key: "logout",
      danger: true,
      icon: <Logout01Icon size={14} />,
      label: "Logout",
      onClick: handleLogout,
      loading: isLoading,
    },
  ];

  return (
    <Suspense fallback={<CenteredSpinner />}>
      {user ? (
        <BreadcrumbProvider>
          <AuthenticatedView
            AVATAR_COLORS={AVATAR_COLORS}
            location={location}
            menuItems={authMenuItems}
            user={user}
            userMenuItems={userMenuItems}
          />
        </BreadcrumbProvider>
      ) : (
        <UnauthenticatedView />
      )}
    </Suspense>
  );
};

export default MainLayout;
