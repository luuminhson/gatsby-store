import React from 'react';
import Helmet from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import ScrollAnimation from '../shared/ScrollAnimation';
import Footer from '../Layout/Footer';

import InterfaceContext from '../../context/InterfaceContext';
import { mediaQuery, FontStyle, spacing, dimensions } from '../../utils/styles';

type Props = {
  title?: string,
  children: React.Node,
  isIndex: bool,
  isBlog: bool,
  isPage: bool,
  withSidebar: bool,
  className: string
};

const PageStyle = css`
  position: relative;
  
  ${mediaQuery.desktop} {
    margin-bottom: 32px;
  }
`;

export const PageInner = styled(`div`)`
  margin: 0 auto;
  max-width: 100%;

  ${mediaQuery.tabletFrom} {
    padding-top: ${spacing['4xl']}px;
  }
`;

const PageTitle = styled(FontStyle.h1)`
  font-size: 1.6rem;
  margin: 0 auto ${spacing.md}px;
  padding: 0 ${spacing.lg}px;

  ${mediaQuery.tabletFrom} {
    margin: 0 auto ${spacing['4xl']}px;
    text-align: center;
    padding: 0 ${spacing.xl}px;
  }
`;

const ProductPageTitle = css`
  margin: 16px auto;
`;

export const PageBody = styled(`div`)`
  margin: 0 0 ${dimensions.botNavHeight};
`;

class PurePage extends React.Component<Props> {

  render() {
    const {
      data,
      children,
      viewportIs,
      pageIs,
      hasFeaturedImage,
      title,
      description,
      pageTitle,
      withSidebar,
      css,
      toggleCart,
      ...rest
    } = this.props;

    const { siteUrl } = data.site.siteMetadata;

    return (
      <div css={[
        PageStyle,
        css
      ]}
        {...rest}
      >
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <meta name="description" content={description} />

          <link rel="preconnect" href="https://orins.design" />
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
          <meta name="apple-mobile-web-app-title" content="ORINS" />

          <meta property="og:url" content={siteUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en" />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content={title} />
          <meta property="og:description" content={description} />

          <meta property="og:image" content={`${siteUrl}/img-share-link.jpg`} />
          <meta property="og:image:alt" content="We are ORINS." />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="686" />
        </Helmet>
        <PageInner>
          {pageTitle &&
            <ScrollAnimation>
              <PageTitle css={pageIs === 'Product' && ProductPageTitle}>{pageTitle}</PageTitle>
            </ScrollAnimation>
          }
          <ScrollAnimation>
            <PageBody>
              {children}
            </PageBody>
          </ScrollAnimation>
          <ScrollAnimation>
            <Footer viewportIs={viewportIs} />
          </ScrollAnimation>
        </PageInner>
      </div>
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

export default props => (
  <InterfaceContext.Consumer>
    {({
      viewportIs,
      pageIs,
      toggleCart
    }) => (
        <Page
          {...props}
          viewportIs={viewportIs}
          pageIs={pageIs}
          toggleCart={toggleCart}
        />
      )}
  </InterfaceContext.Consumer>
);
