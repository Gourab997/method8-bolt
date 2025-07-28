import { Image, Layout } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content } = Layout;

const styles = {
  layout: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottom: '1px solid #f0f0f0',
    padding: '0 24px',
  },
  headerDiv: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  logo: {
    height: '20px',
  },
  contentLayout: {
    flex: '1 1 auto',
    display: 'flex',
  },
  unauthContent: {
    margin: 0,
    backgroundColor: '#fff',
  },
};

const UnauthenticatedView = () => (
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
      </div>
    </Header>
    <Layout style={styles.contentLayout}>
      <Content style={styles.unauthContent}>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

export default UnauthenticatedView;
