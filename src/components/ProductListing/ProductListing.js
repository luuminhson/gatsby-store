import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'react-emotion';

import ProductListingHeader from './ProductListingHeader';
import ProductListingItem from './ProductListingItem';

import { breakpoints, spacing } from '../../utils/styles';

const ProductListingContainer = styled(`div`)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${spacing.lg}px;
  margin: 0 auto;

  @media (min-width: ${breakpoints.tablet}px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: ${spacing['2xl']}px;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    max-width: ${breakpoints.fhd}px;
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
                    fluid(maxWidth: 910, maxHeight: 910) {
                      ...GatsbyImageSharpFluid_withWebp
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
      <>
        <ProductListingHeader />
        <ProductListingContainer>
          {products.edges.map(({ node: product }) => (
            <ProductListingItem key={product.id} product={product} />
          ))}
        </ProductListingContainer>
      </>
    )}
  />
);

export default ProductListing;
