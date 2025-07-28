import { useContext, useEffect } from 'react';
import { BreadcrumbContext } from '../../../context/breadcrumb/breadcrumb-context.js';

const Settings = () => {
  const { setItems } = useContext(BreadcrumbContext);

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Settings',
      },
    ]);
  }, [setItems]);

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export default Settings;
