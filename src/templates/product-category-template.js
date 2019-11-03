import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import styled from '@emotion/styled';
import type { PageContext } from '../types';

import InterfaceContext from '../context/InterfaceContext';
import ProductListingItem from '../components/ProductListingItem';

import { mediaQuery, spacing } from '../utils/styles';

type Props = {
    pageContext: PageContext
};

const ProductListingContainer = styled(`div`)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 ${spacing.sm}px ${spacing.sm}px;
  width: 100%;
  margin: 0 auto;

  ${mediaQuery.tablet} {
    padding: 0 ${spacing.lg}px;
  }

  ${mediaQuery.desktop} {
    padding: 0 ${spacing.xl}px;
  }
`;

class ProductCategoryTemplate extends React.Component<Props> {

    render() {

        const { data, pageContext } = this.props;

        const {
            productType
        } = pageContext;

        const { title, description } = data.site.siteMetadata;

        return (
            <Page pageTitle={productType} title={`${productType} ‧ ${title}`} description={description}>
                <ProductListingContainer>
                    {data.categoryProducts.edges.map(({ node: product }) => (
                        <ProductListingItem key={product.id} product={product} />
                    ))}
                </ProductListingContainer>
            </Page>
        )
    }
}

export default ProductCategoryTemplate;

export const query = graphql`
  query ProductCategoryQuery($productType: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    categoryProducts: allShopifyProduct(
      filter: { productType: { eq: $productType } },
      sort: { fields: [publishedAt], order: DESC }
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
