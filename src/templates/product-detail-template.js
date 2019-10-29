import React, { Component } from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Location } from '@reach/router';
import Helmet from 'react-helmet';
import Page from '../components/Page';

import InterfaceContext from '../context/InterfaceContext';
import ProductPage from '../components/ProductPage';
import RelatedProducts from '../components/ProductPage/RelatedProducts';
import { spacing } from '../utils/styles';

const ProductDetailWrapper = styled(`div`)`
  padding-bottom: ${spacing.xs}px;
`;

class ProductDetailTemplate extends Component {

  componentDidMount() {
    this.props.setPage();
    this.props.setBackLink();
  }

  render() {

    const {
      site,
      shopifyProduct: product,
      shopifyProduct: { title: productTitle, description: fullDescription, productType: productCategory, handle },
      relatedProducts,
    } = this.props.data;

    const description = fullDescription;
    const image = product.images[0].localFile.childImageSharp.fluid.src;

    const {
      viewportIs,
      productImagesBrowserStatus,
      productImageFeatured,
      toggleProductImagesBrowser,
      setCurrentProductImages,
      prevLink
    } = this.props;

    return (
      <Page title={`${productTitle} — ${productCategory} ‧ ${site.siteMetadata.title}`} description={description} from={prevLink} pageIs='Product'>
        <ProductDetailWrapper>
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
        </ProductDetailWrapper>
      </Page>
    )
  }
}

export default props => (
  <Location>
    {({ location }) => (
      <InterfaceContext.Consumer>
        {({
          viewportIs,
          productImagesBrowserStatus,
          productImageFeatured,
          toggleProductImagesBrowser,
          setCurrentProductImages,
          setToProductPage,
          prevLink,
          setPrevLink }) => (
            <ProductDetailTemplate
              {...props}
              viewportIs={viewportIs}
              productImagesBrowserStatus={productImagesBrowserStatus}
              productImageFeatured={productImageFeatured}
              toggleProductImagesBrowser={toggleProductImagesBrowser}
              setCurrentProductImages={setCurrentProductImages}
              setPage={setToProductPage}
              setBackLink={() => setPrevLink(location, '/store')}
              prevLink={prevLink}
            />
          )}
      </InterfaceContext.Consumer>
    )}
  </Location>
)

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
      descriptionHtml
      productType
      variants {
        shopifyId
        title
        price
        compareAtPrice
        availableForSale
        image {
          id
          altText
          localFile {
            childImageSharp {
              resize(width: 1000, height: 1000) {
                src
              }
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        selectedOptions {
          name
          value
        }
      }
      options {
        id
        name
        values
      }
      images {
        id
        altText
        localFile {
          childImageSharp {
            resize(width: 1000, height: 1000) {
              src
            }
            fluid(maxWidth: 1000, quality: 100) {
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
                fluid(maxWidth: 910, quality: 80) {
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
