import '@ant-design/v5-patch-for-react-19';
import '@fontsource/poppins';
import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app.jsx';
import './index.css';
import { store } from './store/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#213e5e',
          fontFamily: 'Poppins, sans-serif',
        },
        components: {
          Menu: {
            itemSelectedBg: '#EFF3F8',
            itemHoverBg: '#EFF3F8',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
