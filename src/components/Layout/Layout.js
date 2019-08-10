import React from 'react';
import styled, { injectGlobal } from 'react-emotion';

import StoreContext, { defaultStoreContext } from '../../context/StoreContext';
import InterfaceContext, { defaultInterfaceContext } from '../../context/InterfaceContext';

import Cart from '../Cart';
import Header from './Header';
import PageContent from './PageContent';
import ProductImagesBrowser from '../ProductPage/ProductImagesBrowser';
import SiteMetadata from '../shared/SiteMetadata';

import { breakpoints, mediaQuery } from '../../utils/styles';

injectGlobal`
    html {
      box-sizing: border-box;
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }

    body {
      -webkit-tap-highlight-color: rgba(0,0,0,.05)
    }
`;

const Viewport = styled(`div`)`
  overflow-x: hidden;
  width: 100%;
`;

const Overlay = styled(`div`)`
  display: none;

  ${mediaQuery.tabletFrom} {
    background: rgba(0, 0, 0, 0.2);
    bottom: 0;
    display: block;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 110vw;
    z-index: 2000;
  }
`;

export default class Layout extends React.Component {
  desktopMediaQuery;

  state = {
    interface: {
      ...defaultInterfaceContext,
      toggleCart: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            cartStatus:
              this.state.interface.cartStatus === 'open' ? 'closed' : 'open'
          }
        }));
      },
      toggleProductImagesBrowser: img => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            productImagesBrowserStatus: img ? 'open' : 'closed',
            productImageFeatured: img
              ? img
              : state.interface.productImageFeatured
          }
        }));
      },
      featureProductImage: img => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            productImageFeatured: img
          }
        }));
      },
      setCurrentProductImages: images => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            currentProductImages: images,
            productImageFeatured: null
          }
        }));
      },
    },
    store: {
      ...defaultStoreContext,
      addVariantToCart: (variantId, quantity) => {
        if (variantId === '' || !quantity) {
          console.error('Both a size and quantity are required.');
          return;
        }

        this.setState(state => ({
          store: {
            ...state.store,
            adding: true
          }
        }));

        const { checkout, client } = this.state.store;
        const checkoutId = checkout.id;
        const lineItemsToUpdate = [
          { variantId, quantity: parseInt(quantity, 10) }
        ];

        return client.checkout
          .addLineItems(checkoutId, lineItemsToUpdate)
          .then(checkout => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout,
                adding: false
              }
            }));
          });
      },
      removeLineItem: (client, checkoutID, lineItemID) => {
        return client.checkout
          .removeLineItems(checkoutID, [lineItemID])
          .then(res => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout: res
              }
            }));
          });
      },
      updateLineItem: (client, checkoutID, lineItemID, quantity) => {
        const lineItemsToUpdate = [
          { id: lineItemID, quantity: parseInt(quantity, 10) }
        ];

        return client.checkout
          .updateLineItems(checkoutID, lineItemsToUpdate)
          .then(res => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout: res
              }
            }));
          });
      }
    }
  };

  async initializeCheckout() {
    // Check for an existing cart.
    const isBrowser = typeof window !== 'undefined';
    const existingCheckoutID = isBrowser
      ? localStorage.getItem('shopify_checkout_id')
      : null;

    const setCheckoutInState = checkout => {
      if (isBrowser) {
        localStorage.setItem('shopify_checkout_id', checkout.id);
      }

      this.setState(state => ({
        store: {
          ...state.store,
          checkout
        }
      }));
    };

    const createNewCheckout = () => this.state.store.client.checkout.create();
    const fetchCheckout = id => this.state.store.client.checkout.fetch(id);

    if (existingCheckoutID) {
      try {
        const checkout = await fetchCheckout(existingCheckoutID);

        // Make sure this cart hasn’t already been purchased.
        if (!checkout.completedAt) {
          setCheckoutInState(checkout);
          return;
        }
      } catch (e) {
        localStorage.setItem('shopify_checkout_id', null);
      }
    }

    const newCheckout = await createNewCheckout();
    setCheckoutInState(newCheckout);
  }

  componentDidMount() {
    // Observe viewport switching from mobile to desktop and vice versa
    const mediaQueryToMatch = `(min-width: ${breakpoints.tablet}px)`;

    this.desktopMediaQuery = window.matchMedia(mediaQueryToMatch);
    this.desktopMediaQuery.addListener(this.updateViewPortState);

    this.updateViewPortState();

    // Make sure we have a Shopify checkout created for cart management.
    this.initializeCheckout();
  }

  componentWillUnmount = () => {
    this.desktopMediaQuery.removeListener(this.updateViewPortState);
  };

  updateViewPortState = e => {
    this.setState(state => ({
      interface: {
        ...state.interface,
        isDesktopViewport: this.desktopMediaQuery.matches
      }
    }));
  };

  componentWillUnmount() {
    this.desktopMediaQuery.removeListener(this.updateViewPortState);
  }

  updateViewPortState = e => {
    this.setState(state => ({
      interface: {
        ...state.interface,
        isDesktopViewport: this.desktopMediaQuery.matches
      }
    }));
  };

  render() {
    const { children, location } = this.props;

    return (
      <>
        <SiteMetadata />
        <StoreContext.Provider value={this.state.store}>
          <InterfaceContext.Provider value={this.state.interface}>
            <InterfaceContext.Consumer>
              {({
                isDesktopViewport,
                cartStatus,
                toggleCart,
                productImagesBrowserStatus,
                currentProductImages,
                featureProductImage,
                productImageFeatured,
                toggleProductImagesBrowser
              }) => (
                  <>
                    {cartStatus === 'open' && <Overlay onClick={toggleCart} />}
                    <Cart
                      isDesktopViewport={isDesktopViewport}
                      status={cartStatus}
                      toggle={toggleCart}
                      productImagesBrowserStatus={productImagesBrowserStatus}
                    />
                    <Header
                      isDesktopViewport={isDesktopViewport}
                      toggleCart={toggleCart}
                    />
                    <Viewport>
                      <PageContent
                        cartStatus={cartStatus}
                        isDesktopViewport={isDesktopViewport}
                        productImagesBrowserStatus={productImagesBrowserStatus}
                        location={location}
                      >
                        {children}
                      </PageContent>

                      {currentProductImages.length > 0 && (
                        <ProductImagesBrowser
                          featureProductImage={featureProductImage}
                          images={currentProductImages}
                          position={productImagesBrowserStatus}
                          imageFeatured={productImageFeatured}
                          toggle={toggleProductImagesBrowser}
                          isDesktopViewport={isDesktopViewport}
                        />
                      )}
                    </Viewport>
                  </>
                )}
            </InterfaceContext.Consumer>
          </InterfaceContext.Provider>
        </StoreContext.Provider>
      </>
    );
  }
}
