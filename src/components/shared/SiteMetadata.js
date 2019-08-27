import React from 'react';
import Helmet from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
import { css } from '@emotion/core';
import { colors, fontFamily } from '../../utils/styles';

const bodyStyles = css`
  color: ${colors.mainDark};
  font-family: ${fontFamily.body};
  font-size: 14px;
  line-height: 1.375;
  margin: 0 auto;
`;

export default () => (
  <StaticQuery
    query={graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            siteUrl
            title
            description
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { siteUrl, title, description }
      }
    }) => (
      <Helmet defaultTitle={title} titleTemplate={`%s · ${title}`}>
        <html lang="en" />
        <body className={bodyStyles} />

        <link rel="preconnect" href="https://originalinside.com" />

        <link rel="canonical" href={siteUrl} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" />
        <meta name="msapplication-TileColor" content="#222222" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Original Inside" />
        <link rel="apple-touch-startup-image" href="launch.png"></link>

        <meta name="description" content={description} />

        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />

        <meta
          property="og:image"
          content={`${siteUrl}/instagram-doraforscale.jpg`}
        />
        <meta
          property="og:image:alt"
          content="We are Original Inside."
        />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="686" />
      </Helmet>
    )}
  />
);
