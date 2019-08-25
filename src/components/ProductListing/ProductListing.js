import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Layout from '../Layout';
import Page from '../Page';
import styled from '@emotion/styled';

import ProductListingHeader from './ProductListingHeader';
import ProductListingItem from './ProductListingItem';

import { mediaQuery, spacing } from '../../utils/styles';

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

const ProductListing = () => (
  <StaticQuery
    query={graphql`
      query ProductListingQuery {
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
    `}
    render={({ products }) => (
      <Layout>
        <Page isStore>
          <ProductListingHeader />
          <ProductListingContainer>
            {products.edges.map(({ node: product }) => (
              <ProductListingItem key={product.id} product={product} />
            ))}
          </ProductListingContainer>
        </Page>
      </Layout>
    )}
  />
);

export default ProductListing;
