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

class ProductCollectionTemplate extends React.Component<Props> {

    render() {

        const { data, pageContext } = this.props;

        const {
            collection
        } = pageContext;

        const { title, description } = data.site.siteMetadata;

        const products = data.collectionProducts.edges[0].node.products;

        return (
            <Page pageTitle={collection} title={`${collection} ‧ ${title}`} description={description}>
                <ProductListingContainer>
                    {products.map((product) => (
                        <ProductListingItem key={product.id} product={product} />
                    ))}
                </ProductListingContainer>
            </Page>
        )
    }
}

export default ProductCollectionTemplate;

export const query = graphql`
    query ProductCollectionQuery($id: String!) {
        site {
        siteMetadata {
            title
            description
        }
        }
        collectionProducts: allShopifyCollection(
            filter: { id: { eq: $id } },
            sort: { fields: [products___publishedAt], order: DESC }
        ) {
            edges {
                node {
                    title
                    handle
                    products {
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
    }
`;



