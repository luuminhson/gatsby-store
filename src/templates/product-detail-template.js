import React from 'react';
import { graphql } from 'gatsby';
import { Location } from '@reach/router';
import Helmet from 'react-helmet';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

import InterfaceContext from '../context/InterfaceContext';
import ProductPage from '../components/ProductPage';
import RelatedProducts from '../components/ProductPage/RelatedProducts';

const ProductDetailTemplate = props => {
  const {
    site,
    shopifyProduct: product,
    shopifyProduct: { title: productTitle, description: fullDescription, productType: productCategory, handle },
    relatedProducts,
  } = props.data;

  const { title: siteTitle } = useSiteMetadata();

  const description = fullDescription;
  const image = product.images[0].localFile.childImageSharp.fluid.src;

  const checkLocationState = (location) => {
    const locationState = location.state;

    if (locationState == null) {
      return '/store';
    } else {
      const hasLocationState = location.state.hasOwnProperty('prevUrl');
      const passedBackLink = hasLocationState ? location.state.prevUrl : '/store';

      return passedBackLink;
    }
  }

  return (
    <Location>
      {({ location }) => (
        <Page title={`${productTitle} — ${productCategory} ‧ ${siteTitle}`} description={description} isProduct from={checkLocationState(location)}>
          <InterfaceContext.Consumer>
            {({
              viewportIs,
              productImagesBrowserStatus,
              productImageFeatured,
              toggleProductImagesBrowser,
              setCurrentProductImages
            }) => (
                <div>
                  <Helmet>
                    <meta
                      property="og:url"
                      content={`${site.siteMetadata.siteUrl}/store/product/${handle}`}
                    />
                    <meta property="og:locale" content="en" />
                    <meta property="og:title" content={productTitle} />
                    <meta property="og:site_name" content="Gatsby Swag Store" />
                    <meta property="og:description" content={description} />

                    {/* TODO: add the image */}
                    <meta
                      property="og:image"
                      content={`${site.siteMetadata.siteUrl}${image}`}
                    />
                    <meta property="og:image:alt" content={productTitle} />
                    <meta property="og:image:width" content="600" />
                    <meta property="og:image:height" content="600" />

                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:site" content="@gatsbyjs" />
                  </Helmet>
                  <ProductPage
                    product={product}
                    viewportIs={viewportIs}
                    productImagesBrowserStatus={productImagesBrowserStatus}
                    productImageFeatured={productImageFeatured}
                    toggleProductImagesBrowser={toggleProductImagesBrowser}
                    setCurrentProductImages={setCurrentProductImages}
                  />
                  <RelatedProducts edges={relatedProducts.edges} limit={4} />
                </div>
              )}
          </InterfaceContext.Consumer>
        </Page>
      )}
    </Location>
  );
};

export default ProductDetailTemplate;

export const query = graphql`
  query($handle: String!, $productType: String) {
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }

    shopifyProduct(handle: { eq: $handle }, productType: { eq: $productType }) {
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

    relatedProducts: allShopifyProduct(
      filter: { productType: { eq: $productType }, handle: { ne: $handle } },
      sort: { fields: [publishedAt], order: ASC }
    ) {
      edges {
        node {
          id
          handle
          title
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
            localFile {
              childImageSharp {
                resize(width: 910, height: 910) {
                  src
                }
                fluid(maxWidth: 910) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
