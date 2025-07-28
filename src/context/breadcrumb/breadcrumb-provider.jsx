import { useState } from 'react';
import { BreadcrumbContext } from './breadcrumb-context.js';

const BreadcrumbProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  return (
    <BreadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export default BreadcrumbProvider;
