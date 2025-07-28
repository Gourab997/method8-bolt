import { useContext, useEffect } from 'react';
import { BreadcrumbContext } from '../../../context/breadcrumb/breadcrumb-context.js';

const ClientDetails = () => {
  const { setItems } = useContext(BreadcrumbContext);

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Clients',
      },
    ]);
  }, [setItems]);

  return (
    <div>
      <h1>Client Details</h1>
    </div>
  );
};

export default ClientDetails;
