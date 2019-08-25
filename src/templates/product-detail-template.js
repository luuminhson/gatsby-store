import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';

import InterfaceContext from '../context/InterfaceContext';
import ProductPage from '../components/ProductPage';

const ProductDetailTemplate = props => {
  const {
    site,
    shopifyProduct: product,
    shopifyProduct: { title, description: fullDescription, handle }
  } = props.data;

  const description = fullDescription;
  const image = product.images[0].localFile.childImageSharp.fluid.src;

  return (
    <Layout>
    <InterfaceContext.Consumer>
      {({
        isDesktopViewport,
        productImagesBrowserStatus,
        productImageFeatured,
        toggleProductImagesBrowser,
        setCurrentProductImages
      }) => (
        <div>
          <Helmet>
            <title>{title}</title>

            <meta name="description" content={description} />

            <meta
              property="og:url"
              content={`${site.siteMetadata.siteUrl}/product/${handle}`}
            />
            <meta property="og:locale" content="en" />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content="Gatsby Swag Store" />
            <meta property="og:description" content={description} />

            {/* TODO: add the image */}
            <meta
              property="og:image"
              content={`${site.siteMetadata.siteUrl}${image}`}
            />
            <meta property="og:image:alt" content={title} />
            <meta property="og:image:width" content="600" />
            <meta property="og:image:height" content="600" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@gatsbyjs" />
          </Helmet>
          <ProductPage
            product={product}
            isDesktopViewport={isDesktopViewport}
            productImagesBrowserStatus={productImagesBrowserStatus}
            productImageFeatured={productImageFeatured}
            toggleProductImagesBrowser={toggleProductImagesBrowser}
            setCurrentProductImages={setCurrentProductImages}
          />
        </div>
      )}
    </InterfaceContext.Consumer>
    </Layout>
  );
};

export default ProductDetailTemplate;

export const query = graphql`
  query($handle: String!) {
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      description
      productType
      variants {
        shopifyId
        title
        price
        compareAtPrice
        availableForSale
      }
      images {
        id
        altText
        localFile {
          childImageSharp {
            resize(width: 1000, height: 1000) {
              src
            }
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
