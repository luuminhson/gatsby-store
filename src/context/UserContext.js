import React from 'react';

export const defaultUserContext = {
  loading: false,
  error: false,
  discount: false,
  handleLogout: () => {},
  updateContributor: () => {}
};

export default React.createContext(defaultUserContext);
