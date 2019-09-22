import React from 'react';
import Helmet from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
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
import Footer from './Footer';
import ProductImagesBrowser from '../ProductPage/ProductImagesBrowser';

import { breakpoints, mediaQuery, fontFamily, colors, dimensions, headerHeight } from '../../utils/styles';

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
`;

const LayoutWrapper = styled(`div`)`
    padding-top: 0;
    overflow: hidden;

    ${mediaQuery.tabletFrom} {
      padding-top: ${dimensions.navPaddingTopTablet};
    }

    ${mediaQuery.desktop} {
      padding-top: ${dimensions.navPaddingTopDesktop};
    }
`;

const Viewport = styled(`div`)`
  width: 100%;
  margin: 0 auto;
`;

const isBlogStyle = css``;

const isStoreStyle = css``;

const isProductStyle = css`
  padding-top: 0;
  margin-top: -${headerHeight.phone};

  ${mediaQuery.tabletFrom} {
    margin-top: calc(-${headerHeight.tablet} - ${dimensions.navPaddingTopTablet});
  }

  ${mediaQuery.desktop} {
    margin-top: calc(-${headerHeight.desktop} - ${dimensions.navPaddingTopDesktop});
  }
`;

const isPostStyle = css``;

const hasFeaturedImageStyle = css`
  margin-top: -${headerHeight.phone};

  ${mediaQuery.tabletFrom} {
    margin-top: calc(-${headerHeight.tablet} - ${dimensions.navPaddingTopTablet});
  }

  ${mediaQuery.desktop} {
    margin-top: calc(-${headerHeight.tablet} - ${dimensions.navPaddingTopDesktop});
  }
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
  };

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

  componentWillUnmount = () => {
    this.tabletMediaQuery.removeListener(this.updateViewPortState);
    this.desktopMediaQuery.removeListener(this.updateViewPortState);
  };

  componentDidUpdate(prevProps, prevState) {
    const sidebarStatusChanged = prevState.sidebar !== this.state.sidebar;
    const cartStatusChanged = prevState.interface.cartStatus !== this.state.interface.cartStatus;

    // Add body class 'noScroll'

    cartStatusChanged && (
      (this.state.interface.cartStatus === 'open') ?
        document.body.classList.add('noScroll')
      :
        document.body.classList.remove('noScroll')
    );

    sidebarStatusChanged && (
      (this.state.sidebar === true) ?
        document.body.classList.add('noScroll')
      :
      document.body.classList.remove('noScroll')
    );
  }

  updateViewPortState = e => {
    this.setState(state => ({
      interface: {
        ...state.interface,
        viewportIs: ( this.desktopMediaQuery.matches ? 'desktop' : ( this.tabletMediaQuery.matches ? 'tablet' : null) ),
      }
    }));
  };

  render() {
    const {
      data,
      title,
      description,
      children,
      detailTitle,
      isPost,
      isBlog,
      isIndex,
      isStore,
      isProduct,
      hasFeaturedImage,
      from
    } = this.props;

    const { siteUrl } = data.site.siteMetadata;

    return (
      <LayoutWrapper>
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <meta name="description" content={description} />

          <link rel="preconnect" href="https://originalinside.com" />
          <link rel="canonical" href={siteUrl} />
          <link rel="apple-touch-startup-image" href="launch.png"></link>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" />
          <meta name="msapplication-TileColor" content="#222222" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Original Inside" />

          <meta property="og:url" content={siteUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en" />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content={title} />
          <meta property="og:description" content={description} />

          <meta property="og:image" content={`${siteUrl}/instagram-doraforscale.jpg`} />
          <meta property="og:image:alt" content="We are Original Inside." />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="686" />
        </Helmet>
        <StoreContext.Provider value={this.state.store}>
          <InterfaceContext.Provider value={this.state.interface}>
            <InterfaceContext.Consumer>
              {({
                viewportIs,
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
                            viewportIs={viewportIs}
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
                            viewportIs={viewportIs}
                            burgerClick={this.toggleSidebar}
                            isIndex={isIndex}
                            isPost={isPost}
                            isStore={isStore}
                            isProduct={isProduct}
                            detailTitle={detailTitle}
                            onFeaturedImage={hasFeaturedImage}
                            from={from}
                          />
                          <Viewport
                            css={[
                              isStore && isStoreStyle,
                              isProduct && isProductStyle,
                              isBlog && isBlogStyle,
                              isPost && isPostStyle,
                              isPost && hasFeaturedImage && hasFeaturedImageStyle,
                            ]}
                          >
                            <PageContent
                              cartStatus={cartStatus}
                              viewportIs={viewportIs}
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
                                viewportIs={viewportIs}
                              />
                            )}
                          </Viewport>
                          <Footer viewportIs={viewportIs} />
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