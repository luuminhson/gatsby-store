import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { injectGlobal } from 'emotion';
import StoreContext, { defaultStoreContext } from '../../context/StoreContext';
import InterfaceContext, { defaultInterfaceContext } from '../../context/InterfaceContext';

import OiIcon from '../OiIcon';
import Cart from '../Cart';
import CartIndicator from '../Cart/CartIndicator';
import Navigation from './Navigation';
import SidePanel from '../SidePanel';
import PageContent from './PageContent';
import ProductImagesBrowser from '../ProductPage/ProductImagesBrowser';
import SiteMetadata from '../shared/SiteMetadata';

import { breakpoints, mediaQuery, fontFamily, colors, dimensions } from '../../utils/styles';

injectGlobal`
    html {
      box-sizing: border-box;
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }

    body {
      -webkit-tap-highlight-color: rgba(0,0,0,.05);
      margin: 0;
      font-family: ${fontFamily.body};

      &.noScroll {
        overflow: hidden;
        -webkit-overflow-scrolling: none;
        touch-action: none;
      }
    }

    a {
      text-decoration: none;
    }
`;

const LayoutWrapper = styled(`div`)`

`;

const Viewport = styled(`div`)`
  overflow-x: hidden;
  width: 100%;
`;

const overlayOn = css`
  opacity: 1;
  z-index: 2000;
`;

const overlayOff = css`
  opacity: 0;
  z-index: -1;
`;

const Overlay = styled(`div`)`
  background: rgba(0, 0, 0, 0.2);
  bottom: 0;
  display: block;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 110vw;
  z-index: -1;
  transition: all 0.5s ease-in-out;
`;

const SidePanelWrapper = styled(`div`)`
  max-width: 80%;  
  background-color: ${colors.white};
  position: fixed;
  top: 0;
  right: 0;
  opacity: 0;
  will-change: transform;
  transform: translate3d(100%, 0, 0);
  z-index: 3000;
  transition: transform 0.3s cubic-bezier(0.46, 0.98, 0.43, 1.01), box-shadow 0.25s ease-in-out, opacity 0.25s ease-in-out 1s;

  ${mediaQuery.tabletFrom} {
    min-width: ${dimensions.sidePanelMaxwidth};
  }
`;

const SidebarOn = css`
  opacity: 1;
  box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
  transform: translate3d(0, 0, 0);
  transition: transform 0.35s cubic-bezier(0.46, 0.98, 0.43, 1.01), box-shadow 0.25s ease-in-out, opacity 0.3s ease-in-out;
`;

const SidePanelCloseBtn = css`
  cursor: pointer;
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 3100;
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
        // Add body class 'noScroll'
        document.body.classList.toggle('noScroll');
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

      featureProductImageIndex: idx => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            productImageFeaturedIndex: idx
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
    },
    sidebar: false,
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

  toggleSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
    // Add body class 'noScroll'
    document.body.classList.toggle('noScroll');
  };

  componentDidMount() {
    // Observe viewport switching from mobile to desktop and vice versa
    const mediaQueryToMatch = `(min-width: ${breakpoints.tablet}px)`;

    this.desktopMediaQuery = window.matchMedia(mediaQueryToMatch);
    this.desktopMediaQuery.addListener(this.updateViewPortState);

    this.updateViewPortState();

    // Make sure we have a Shopify checkout created for cart management.
    this.initializeCheckout();

    // Remove body class 'noScroll'
    document.body.className = document.body.classList.remove('noScroll');
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

  render() {
    const {
      children,
      title,
      description,
      detailTitle,
      isPost,
      isBlog,
      isIndex,
      hasFeaturedImage,
      from
    } = this.props;

    return (
      <LayoutWrapper>
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
                productImageFeatured,
                productImageFeaturedIndex,
                toggleProductImagesBrowser
              }) => (
                  <StoreContext.Consumer>
                    {({ checkout, adding }) => {
                      const itemsInCart = checkout.lineItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      );

                      return (
                        <>
                          <Overlay
                            onClick={toggleCart}
                            css={cartStatus === 'open' ? overlayOn : overlayOff}
                          />
                          <Overlay
                            onClick={this.toggleSidebar}
                            css={this.state.sidebar === true ? overlayOn : overlayOff}
                          />
                          <CartIndicator itemsInCart={itemsInCart} adding={adding} />
                          <Cart
                            isDesktopViewport={isDesktopViewport}
                            status={cartStatus}
                            toggle={toggleCart}
                            productImagesBrowserStatus={productImagesBrowserStatus}
                          />
                          <SidePanelWrapper css={this.state.sidebar === true && SidebarOn}>
                            <OiIcon icon='oi-icon-close' css={SidePanelCloseBtn} onClick={this.toggleSidebar} />
                            <SidePanel />
                          </SidePanelWrapper>
                          <Navigation
                            toggleCart={toggleCart}
                            isDesktopViewport={isDesktopViewport}
                            burgerClick={this.toggleSidebar}
                            isIndex={isIndex}
                            isPost={isPost}
                            detailTitle={detailTitle}
                            onFeaturedImage={hasFeaturedImage}
                            from={from}
                          />
                          <Viewport>
                            <PageContent
                              cartStatus={cartStatus}
                              isDesktopViewport={isDesktopViewport}
                              productImagesBrowserStatus={productImagesBrowserStatus}
                            >
                              {children}
                            </PageContent>

                            {currentProductImages.length > 0 && (
                              <ProductImagesBrowser
                                images={currentProductImages}
                                position={productImagesBrowserStatus}
                                imageFeatured={productImageFeatured}
                                imageFeaturedIndex={productImageFeaturedIndex}
                                toggle={toggleProductImagesBrowser}
                                isDesktopViewport={isDesktopViewport}
                              />
                            )}
                          </Viewport>
                        </>
                      );
                    }}
                  </StoreContext.Consumer>
                )}
            </InterfaceContext.Consumer>
          </InterfaceContext.Provider>
        </StoreContext.Provider>
      </LayoutWrapper>
    );
  }
}
