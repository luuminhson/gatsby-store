import React from 'react';

export const defaultInterfaceContext = {
  viewportIs: null,
  submenuOpened: null,
  toggleSubmenu: () => {},
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
  pageIs: null,
  hasFeaturedImage: false,
  setToProductPage: () => {},
  setToProductCollectionPage: () => {},
  setToProductCategoryPage: () => {},
  setToPostPage: () => {},
  setToBlogPage: () => {},
  setToIndexPage: () => {},
  setToStorePage: () => {},
  setToCartPage: () => {},
  setToMorePage: () => {},
  setToPagePage: () => {},
  setToHasFeaturedImage: () => {},
  prevLink: null,
  setPrevLink: () => {},
};

export default React.createContext(defaultInterfaceContext);
