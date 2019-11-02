import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Location } from '@reach/router';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { injectGlobal } from 'emotion';
import StoreContext, { defaultStoreContext } from '../../context/StoreContext';
import InterfaceContext, { defaultInterfaceContext } from '../../context/InterfaceContext';

import OiIcon from '../OiIcon';
import Cart from '../Cart';
import CartIndicator from '../Cart/CartIndicator';
import Navigation from './Navigation';
import BottomNavigation from '../BottomNavigation';
import SidePanel from '../SidePanel';
import PageContent from './PageContent';

import { breakpoints, mediaQuery, fontFamily, colors, dimensions, spacing, fontWeight } from '../../utils/styles';

injectGlobal`
    @keyframes fadeInMobile {
      from {
        opacity: 0;
        transform: translate3d(0, 40px, 0);
      }
    }

    @keyframes fadeInDesktop {
      from {
        opacity: 0;
        transform: translate3d(0, 40px, 0);
      }
    }

    html {
      box-sizing: border-box;
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }

    body {
      -webkit-tap-highlight-color: transparent;
      margin: 0;
      font-family: ${fontFamily.body};
      color: ${colors.mainDark};
      line-height: 1.5rem;

      &.noScroll {
        overflow: hidden;
        -webkit-overflow-scrolling: none;
        touch-action: none;
      }
    }

    ul {
      list-style: square;

      li {
        padding: 0 0.3125rem;
        margin-bottom: 0.625rem;
      }
    }

    label {
      margin-bottom: ${spacing.sm}px;
      font-weight: ${fontWeight.body.medium};
    }

    a {
      color: ${colors.mainClickable};
      text-decoration: none;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ${fontFamily.heading};
      font-weight: 600;
      margin-top: 1.6em;
      margin-bottom: 0.8em;
    }

    .animated {
      animation-duration: 1s;
      animation-fill-mode: both;

      &.fadeIn {
        animation-name: fadeInMobile;

        ${mediaQuery.tabletFrom} {
          animation-name: fadeInDesktop;
        }
      }
    }
`;

const LayoutWrapper = styled(`div`)`
    overflow: hidden;
    position: relative;
    padding-top: ${dimensions.navPaddingTopPhone}px;

    ${mediaQuery.tabletFrom} {
      padding-top: ${dimensions.navPaddingTopTablet}px;
    }

    ${mediaQuery.desktop} {
      padding-top: ${dimensions.navPaddingTopDesktop}px;
    }
`;

const overlayOn = css`
  opacity: 1;
  z-index: 2500;
`;

const overlayOff = css`
  opacity: 0;
  pointer-events: none;
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

class PureLayout extends React.Component {
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
      toggleSidebar: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            sidebarStatus:
              this.state.interface.sidebarStatus === true ? false : true
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
      setPrevLink: (location, defaultLocation) => {
        const locationState = location.state;

        if (locationState == null) {
          this.setState(state => ({
            interface: {
              ...state.interface,
              prevLink: defaultLocation
            }
          }));
        } else {
          const hasLocationState = location.state.hasOwnProperty('prevUrl');
          const passedBackLink = hasLocationState ? location.state.prevUrl : defaultLocation;

          this.setState(state => ({
            interface: {
              ...state.interface,
              prevLink: passedBackLink
            }
          }));
        }
      },
      setToPostPage: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            pageIs: 'Post'
          }
        }));
      },
      setToProductPage: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            pageIs: 'Product'
          }
        }));
      },
      setToBlogPage: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            pageIs: 'Blog'
          }
        }));
      },
      setToIndexPage: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            pageIs: 'Index'
          }
        }));
      },
      setToStorePage: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            pageIs: 'Store'
          }
        }));
      },
      setToCartPage: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            pageIs: 'Cart'
          }
        }));
      },
      setToMorePage: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            pageIs: 'More'
          }
        }));
      },
      setToPagePage: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            pageIs: 'Page'
          }
        }));
      },
      setToHasFeaturedImage: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            hasFeaturedImage: this.state.interface.pageIs === 'Post' ? true : false,
          }
        }));
      },
    },
    store: {
      ...defaultStoreContext,
      setCurrentVariant: (variant) => {
        this.setState(state => ({
          store: {
            ...state.store,
            currentVariant: variant
          }
        }));
      },
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
    className: ''
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
    const mediaQueryToMatchTablet = `(min-width: ${breakpoints.tablet}px)`;
    const mediaQueryToMatchDesktop = `(min-width: ${breakpoints.desktop}px)`;

    this.tabletMediaQuery = window.matchMedia(mediaQueryToMatchTablet);
    this.desktopMediaQuery = window.matchMedia(mediaQueryToMatchDesktop);

    this.tabletMediaQuery.addListener(this.updateViewPortState);
    this.desktopMediaQuery.addListener(this.updateViewPortState);

    this.updateViewPortState();

    // Make sure we have a Shopify checkout created for cart management.
    this.initializeCheckout();

    // Remove body class 'noScroll'
    document.body.className = document.body.classList.remove('noScroll');
  }

  componentDidUpdate(prevProps, prevState) {
    const sidebarStatusChanged = prevState.interface.sidebarStatus !== this.state.interface.sidebarStatus;
    const cartStatusChanged = prevState.interface.cartStatus !== this.state.interface.cartStatus;

    // Add body class 'noScroll'

    cartStatusChanged && (
      (this.state.interface.cartStatus === 'open') ?
        document.body.classList.add('noScroll')
        :
        document.body.classList.remove('noScroll')
    );

    sidebarStatusChanged && (
      (this.state.interface.sidebarStatus === true) ?
        document.body.classList.add('noScroll')
        :
        document.body.classList.remove('noScroll')
    );
  }

  componentWillUnmount() {
    this.tabletMediaQuery.removeListener(this.updateViewPortState);
    this.desktopMediaQuery.removeListener(this.updateViewPortState);
  };

  updateViewPortState = e => {
    this.setState(state => ({
      interface: {
        ...state.interface,
        viewportIs: (this.desktopMediaQuery.matches ? 'desktop' : (this.tabletMediaQuery.matches ? 'tablet' : null)),
      }
    }));
  };

  render() {
    const { children } = this.props;
    const { className } = this.state;

    return (
      <LayoutWrapper className={className}>
        <StoreContext.Provider value={this.state.store}>
          <InterfaceContext.Provider value={this.state.interface}>
            <InterfaceContext.Consumer>
              {({
                viewportIs,
                pageIs,
                cartStatus,
                sidebarStatus,
                toggleCart,
                toggleSidebar,
                hasFeaturedImage,
                prevLink
              }) => (
                  <StoreContext.Consumer>
                    {({ checkout, adding }) => {
                      const itemsInCart = checkout.lineItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      );

                      return (
                        <Location>
                          {({ location }) => (
                            <>
                              <Overlay
                                onClick={toggleCart}
                                css={cartStatus === 'open' ? overlayOn : overlayOff}
                              />
                              <Overlay
                                onClick={toggleSidebar}
                                css={sidebarStatus === true ? overlayOn : overlayOff}
                              />
                              <CartIndicator itemsInCart={itemsInCart} adding={adding} />
                              <Cart
                                viewportIs={viewportIs}
                                status={cartStatus}
                                toggle={toggleCart}
                              />
                              <SidePanelWrapper css={sidebarStatus === true && SidebarOn}>
                                <OiIcon icon='oi-icon-close' css={SidePanelCloseBtn} onClick={toggleSidebar} />
                                <SidePanel toggleSidebar={toggleSidebar} />
                              </SidePanelWrapper>
                              <Navigation
                                from={prevLink}
                                pageIs={pageIs}
                                viewportIs={viewportIs}
                                cartNumber={itemsInCart}
                                toggleCart={toggleCart}
                                toggleSidebar={toggleSidebar}
                                burgerClick={toggleSidebar}
                                onFeaturedImage={hasFeaturedImage}
                              />
                              {/* {viewportIs === null &&
                                <BottomNavigation
                                  pageIs={pageIs}
                                  cartNumber={itemsInCart}
                                />
                              } */}
                              <PageContent
                                cartStatus={cartStatus}
                                viewportIs={viewportIs}
                                location={location}
                              >
                                {children}
                              </PageContent>
                            </>
                          )}
                        </Location>
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

export const Layout = (props) => (
  <StaticQuery
    query={graphql`
      query MainLayoutQuery {
        site {
          siteMetadata {
            siteUrl
            title
            description
            contacts {
              phone
              email
              facebook
              instagram
            }
            menu {
              label
              path
            }
          }
        }
      }
    `}
    render={(data) => <PureLayout {...props} data={data} />}
  />
);

export default Layout;