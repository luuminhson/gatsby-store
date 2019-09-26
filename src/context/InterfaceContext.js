import React from 'react';

export const defaultInterfaceContext = {
  viewportIs: null,
  cartStatus: 'initial',
  sidebarStatus: false,
  toggleCart: () => {},
  toggleSidebar: () => {},
  productImageFeatured: null,
  productImageFeaturedIndex: 0,
  featureProductImage: () => {},
  featureProductImageIndex: () => {},
  currentProductImages: [],
  setCurrentProductImages: () => {},
  productImagesBrowserStatus: 'initial',
  toggleProductImagesBrowser: () => {}
};

export default React.createContext(defaultInterfaceContext);
