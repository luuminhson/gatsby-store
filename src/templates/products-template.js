import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import styled from '@emotion/styled';

import InterfaceContext from '../context/InterfaceContext';
import ProductListingItem from '../components/ProductListingItem';

import { mediaQuery, spacing } from '../utils/styles';

const ProductListingContainer = styled(`div`)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 ${spacing.sm}px ${spacing.sm}px;
  width: 100%;
  margin: 0 auto;

  ${mediaQuery.tablet} {
    padding: 0 ${spacing.md}px;
  }

  ${mediaQuery.desktop} {
    padding: 0 ${spacing.xl}px;
  }
`;

class ProductsTemplate extends React.Component<Props> {

  componentDidMount() {
    this.props.setPage();
  }

  render() {

    const { data } = this.props;

    const { title, description } = data.site.siteMetadata;

    return (
      <Page pageTitle='Các loại bánh' title={`Các loại bánh ‧ ${title}`} description={description} pageIs='Store'>
        <ProductListingContainer>
          {data.products.edges.map(({ node: product }) => (
            <ProductListingItem key={product.id} product={product} />
          ))}
        </ProductListingContainer>
      </Page>
    )
  }
}

export default props => (
  <InterfaceContext.Consumer>
    {({
      setToStorePage,
    }) => (
        <ProductsTemplate
          {...props}
          setPage={setToStorePage}
        />
      )}
  </InterfaceContext.Consumer>
)

export const query = graphql`
  query ProductsTemplateQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    products: allShopifyProduct(
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
          parent {
            ... on ShopifyCollection {
              id
            }
          }
        }
      }
    }
  }
`;
