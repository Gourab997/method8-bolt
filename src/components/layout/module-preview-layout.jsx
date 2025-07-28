import { Suspense } from "react";
import { Spin, Layout } from "antd";
import BreadcrumbProvider from "../../context/breadcrumb/breadcrumb-provider.jsx";

const { Content } = Layout;

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

const ModulePreviewLayout = ({ children }) => (
  <Suspense fallback={<CenteredSpinner />}>
    <BreadcrumbProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Content>{children}</Content>
      </Layout>
    </BreadcrumbProvider>
  </Suspense>
);

export default ModulePreviewLayout;
