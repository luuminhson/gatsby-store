import React from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'checkout.oicakery.com', // this might be replaced with checkout custom domain
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

export const defaultStoreContext = {
  client,
  isCartOpen: false,
  adding: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {},
  currentVariant: null,
  setCurrentVariant: () => {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {}
};

const StoreContext = React.createContext(defaultStoreContext);

export const withStoreContext = Component => {
  return props => (
    <StoreContext.Consumer>
      {context => <Component {...props} storeContext={context} />}
    </StoreContext.Consumer>
  );
};

export default StoreContext;
