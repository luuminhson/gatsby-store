import React from 'react';
import Helmet from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { MobileNavigation } from '../Layout/Navigation';

import InterfaceContext from '../../context/InterfaceContext';
import { mediaQuery, FontStyle, dimensions, spacing, headerHeight } from '../../utils/styles';

type Props = {
  title?: string,
  children: React.Node,
  isIndex: bool,
  isBlog: bool,
  isPage: bool,
  isIllussion: bool,
  withSidebar: bool,
  className: string
};

const PageStyle = css`
  position: relative;
  
  ${mediaQuery.desktop} {
    margin-bottom: 32px;
  }
`;

const PageInner = styled(`div`)`
  margin: 0 auto;
  padding-bottom: ${spacing.xl}px;
  max-width: 100%;

  ${mediaQuery.tabletFrom} {
    max-width: ${dimensions.indexPageWidth};
  }
`;

const PageTitle = styled(FontStyle.h1)`
  margin: 40px auto;
  text-align: center;
`;

export const PageBody = styled(`div`)`
  margin: 0 0 16px;
`;

const isIndexStyle = css`
  ${PageInner} {
    padding-top: ${spacing.lg}px;
  }
`;

const isStoreStyle = css`
  ${PageInner} {
    max-width: ${dimensions.storePageWidth};
    padding-left: 0;
    padding-right: 0;
  }
`;

const isBlogStyle = css`
  ${PageInner} {
    margin: 0 auto;
    padding-left: ${spacing.lg}px;
    padding-right: ${spacing.lg}px;

    ${mediaQuery.tabletFrom} {
      max-width: ${dimensions.blogPageWidth};
      padding-left: ${spacing.xl}px;
      padding-right: ${spacing.xl}px;
    }
  }
`;

const isProductStyle = css`
  padding-top: 0;

  ${mediaQuery.tabletFrom} {
    ${PageInner} {
      margin-top: calc(-${headerHeight.tablet} - ${dimensions.navPaddingTopTablet});
    }
  }

  ${mediaQuery.desktop} {
    ${PageInner} {
      margin-top: calc(-${headerHeight.desktop} - ${dimensions.navPaddingTopDesktop});
    }
  }
`;

const isPageStyle = css``;

const withSidebarStyle = css`
  ${PageInner} {
    max-width: ${dimensions.blogWithSidebarPageWidth};
  }
`;

const hasFeaturedImageStyle = css`

`;

class PurePage extends React.Component {
  render() {
    const {
      data,
      children,
      title,
      description,
      pageTitle,
      detailTitle,
      isPage,
      isPost,
      isBlog,
      isIndex,
      isStore,
      isProduct,
      isCart,
      isMore,
      mainTitle,
      hasFeaturedImage,
      withSidebar,
      css,
      from,
      ...rest
    } = this.props;

    const { siteUrl } = data.site.siteMetadata;

    return (
      <InterfaceContext.Consumer>
        {({
          viewportIs
        }) => (
            <div css={[
              PageStyle,
              isIndex && isIndexStyle,
              isStore && isStoreStyle,
              isBlog && isBlogStyle,
              isPage && isPageStyle,
              isProduct && isProductStyle,
              withSidebar && withSidebarStyle,
              isPost && hasFeaturedImage && hasFeaturedImageStyle,
              css
            ]}
              {...rest}
            >
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
              {viewportIs === null &&
                <MobileNavigation
                  viewportIs={viewportIs}
                  isIndex={isIndex}
                  isPost={isPost}
                  isStore={isStore}
                  isProduct={isProduct}
                  mainTitle={mainTitle}
                  from={from}
                />
              }
              <PageInner>
                {pageTitle && <PageTitle>{pageTitle}</PageTitle>}
                <PageBody>
                  {children}
                </PageBody>
              </PageInner>
            </div>
          )}
      </InterfaceContext.Consumer>
    );
  }
}

export const Page = (props) => (
  <StaticQuery
    query={graphql`
      query MainPageQuery {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `}
    render={(data) => <PurePage {...props} data={data} />}
  />
);

export default Page;