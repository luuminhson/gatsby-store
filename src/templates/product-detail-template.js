import React, { Component } from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Location } from '@reach/router';
import Helmet from 'react-helmet';
import Page from '../components/Page';

import InterfaceContext from '../context/InterfaceContext';
import StoreContext from '../context/StoreContext';

import ProductPage from '../components/ProductPage';
import RelatedProducts from '../components/ProductPage/RelatedProducts';
import { spacing } from '../utils/styles';

const _ = require('lodash');

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
      shopifyProduct: {
        title: productTitle,
        description: fullDescription,
        productType: productCategory,
        handle,
        variants,
        images: originalImages
      },
      relatedProducts,
    } = this.props.data;

    const description = fullDescription;
    const image = product.images[0].localFile.childImageSharp.fluid.src;

    const {
      viewportIs,
      productImageFeatured,
      setCurrentProductImages,
      prevLink
    } = this.props;

    // Process the product images
    // Display the current variant image first, then all non-variant images

    const getCurrentVariantIndex = (currentVariant) => (
      _.findIndex(variants, item => (
        item.shopifyId == currentVariant
      ))
    );

    const processedImages = _.uniq(originalImages.map(i => (i)));

    const variantImages = variants.map(i => (i.image));

    const variantImageIds = variants.map(i => (i.image.id));

    const filterImages = (currentVariant) => {
      for (let i = 0; i < processedImages.length; i++) {
        _.remove(processedImages, item => {
          return item.id == variantImageIds[i];
        })
      }
      processedImages.splice(0, 0, variantImages[getCurrentVariantIndex(currentVariant)])
    };

    const hasVariants = variants.length > 1;

    const finalImages = hasVariants ? processedImages : originalImages;

    return (
      <StoreContext.Consumer>
        {({
          currentVariant
        }) => (
            <Page title={`${productTitle} — ${productCategory} ‧ ${site.siteMetadata.title}`} description={description} from={prevLink} pageIs='Product'>
              <ProductDetailWrapper>

                {currentVariant && currentVariant !== null && filterImages(currentVariant)}

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
                  finalImages={finalImages}
                  viewportIs={viewportIs}
                  productImageFeatured={productImageFeatured}
                  setCurrentProductImages={setCurrentProductImages}
                />
                <RelatedProducts
                  edges={relatedProducts.edges}
                  limit={4}
                  product={product}
                />
              </ProductDetailWrapper>
            </Page>
          )}
      </StoreContext.Consumer>
    )
  }
}

export default props => (
  <Location>
    {({ location }) => (
      <InterfaceContext.Consumer>
        {({
          viewportIs,
          productImageFeatured,
          currentProductImages,
          setCurrentProductImages,
          productImageFeaturedIndex,
          setToProductPage,
          prevLink,
          setPrevLink }) => (
            <ProductDetailTemplate
              {...props}
              viewportIs={viewportIs}
              productImageFeatured={productImageFeatured}
              productImageFeaturedIndex={productImageFeaturedIndex}
              currentProductImages={currentProductImages}
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
        shopifyId
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

    relatedProducts: allShopifyProduct {
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
