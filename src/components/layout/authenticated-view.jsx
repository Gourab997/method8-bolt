import { Avatar, Breadcrumb, Dropdown, Image, Layout, Menu } from "antd";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { BreadcrumbContext } from "../../context/breadcrumb/breadcrumb-context.js";

const { Header, Content } = Layout;

const styles = {
  layout: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottom: "1px solid #f0f0f0",
    padding: "0 24px",
  },
  headerDiv: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
  },
  logo: {
    height: "20px",
  },
  menu: {
    borderRight: 0,
    flex: 1,
    minWidth: 0,
  },
  contentLayout: {
    flex: "1 1 auto",
    display: "flex",
  },
  authContentWrapper: {
    paddingInline: "16px",
    paddingBottom: "16px",
    borderRadius: 8,
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    margin: 0,
  },
  breadcrumb: {
    height: "54px",
    display: "flex",
    alignItems: "center",
  },
  authContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    padding: "16px",
  },
};

const itemRender = (route, _params, items, _paths) => {
  const last = items.indexOf(route) === items.length - 1;
  return last || !route.href ? (
    <span>{route.title}</span>
  ) : (
    <Link to={route.href}>{route.title}</Link>
  );
};

const AuthenticatedView = ({
  user,
  menuItems,
  userMenuItems,
  location,
  AVATAR_COLORS,
  breadcrumbItems, // <- allow override
}) => {
  const context = useContext(BreadcrumbContext);
  const items = breadcrumbItems || context.items; // fallback to context

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <div style={styles.headerDiv}>
          <Link to="/">
            <Image
              alt="Logo"
              preview={false}
              src="/logo.png"
              style={styles.logo}
            />
          </Link>
          <Menu
            items={menuItems}
            mode="horizontal"
            selectedKeys={[location.pathname]}
            style={styles.menu}
          />
        </div>
        <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
          <Avatar
            size="large"
            style={{
              backgroundColor:
                AVATAR_COLORS[user?.first_name?.charAt(0)?.toUpperCase()],
              cursor: "pointer",
            }}
          >
            {user?.first_name?.charAt(0)?.toUpperCase()}
          </Avatar>
        </Dropdown>
      </Header>

      <Layout style={styles.contentLayout}>
        <Content style={styles.authContentWrapper}>
          <Breadcrumb
            itemRender={itemRender}
            items={items}
            style={styles.breadcrumb}
          />
          <Content style={styles.authContent}>
            <Outlet />
          </Content>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedView;
