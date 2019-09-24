import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import styled from '@emotion/styled';

import { useSiteMetadata } from '../hooks';

import ProductListingItem from '../components/ProductListingItem';

import { mediaQuery, spacing } from '../utils/styles';

const ProductListingContainer = styled(`div`)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: ${spacing.sm}px;
  width: 100%;
  margin: 0 auto;

  ${mediaQuery.tablet} {
    padding: ${spacing.lg}px;
  }

  ${mediaQuery.desktop} {
    padding: ${spacing.xl}px;
  }
`;

const StoreTemplate = ({ data }) => {
  const { title, description } = useSiteMetadata();
  return (
    <Page pageTitle='Store' title={`Store ‧ ${title}`} description={description} isStore>
      <ProductListingContainer>
        {data.products.edges.map(({ node: product }) => (
          <ProductListingItem key={product.id} product={product} />
        ))}
      </ProductListingContainer>
    </Page>
  );
};

export const query = graphql`
  query StoreTemplateQuery {
    products: allShopifyProduct(
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

export default StoreTemplate;
