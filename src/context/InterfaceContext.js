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
  pageIs: null,
  hasFeaturedImage: false,
  prevLink: null,
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
  setPrevLink: () => {},
};

export default React.createContext(defaultInterfaceContext);
