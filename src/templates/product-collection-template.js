import React from 'react';
import { graphql } from 'gatsby';
import Page, { PageInner } from '../components/Page';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import type { PageContext } from '../types';

import InterfaceContext from '../context/InterfaceContext';
import Image from 'gatsby-image';
import ProductListingItem from '../components/ProductListingItem';
import { mediaQuery, spacing, FontStyle, colors, dimensions } from '../utils/styles';

type Props = {
    pageContext: PageContext
};

const CollectionTitle = styled(FontStyle.h1)``;

const CollectionDescription = styled(`div`)`
    max-width: 600px;

    ${mediaQuery.tabletFrom} {
        text-align: center;
    }
`;

const CollectionImage = styled(Image)`
    width: 100vw;
    height: 25vh;
    max-height: 80vw;

    ${mediaQuery.tabletFrom} {
        height: 35vw;
        min-height: 35vw;
        max-height: 45vh;
    }
`;

const TitleGroup = styled(`div`)`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 ${spacing.lg}px;

    ${mediaQuery.tabletFrom} {
        align-items: center;
        padding: 0 ${spacing.xl}px;
    }

    ${mediaQuery.desktop} {
        padding: 0 ${spacing['4xl']}px;
    }
`;

const CollectionHeader = styled(`div`)`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: ${spacing.md}px;

    ${mediaQuery.tabletFrom} {
        margin-bottom: ${spacing['4xl']}px;
    }
`;

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

const PageWithHeaderImgCss = css`
  ${PageInner} {
      padding-top: ${dimensions.navPaddingTopPhone}px;

      ${mediaQuery.tabletFrom} {
        padding-top: ${dimensions.navPaddingTopTablet}px;
      }

      ${mediaQuery.desktop} {
        padding-top: ${dimensions.navPaddingTopDesktop}px;
      }
  }

  ${TitleGroup} {
      margin-top: ${spacing.md}px;
  }

  ${mediaQuery.tabletFrom} {
    ${CollectionHeader} {
        &:after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.4);
            z-index: 10;
        }
    }

    ${TitleGroup} {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: ${spacing.md}px;
        transform: translate(-50%, -50%);
        z-index: 100;

        ${CollectionTitle} {
            color: ${colors.white};
        }

        ${CollectionDescription} {
            color: ${colors.white};
            opacity: 0.9;
        }

        ${mediaQuery.tabletFrom} {
            margin-top: 0;
        }
    }      
  }

`;

class ProductCollectionTemplate extends React.Component<Props> {

    componentDidMount() {
        this.props.setPage();
    }

    render() {

        const { data, pageContext } = this.props;

        const {
            collectionName
        } = pageContext;

        const { title, description } = data.site.siteMetadata;

        const collection = data.collectionProducts.edges[0].node;

        const collectionDescription = collection.descriptionHtml;

        const collectionProducts = collection.products;

        const hasCollectionImage = collection.image !== null;

        const fluid = hasCollectionImage && collection.image.localFile.childImageSharp.fluid;

        return (
            <Page css={hasCollectionImage && PageWithHeaderImgCss} pageTitle={null} title={`${collectionName} Collection ‧ ${title}`} description={description}>
                <CollectionHeader>
                    {hasCollectionImage && <CollectionImage fluid={fluid && fluid} />}
                    <TitleGroup>
                        <CollectionTitle>{collectionName}</CollectionTitle>
                        { collectionDescription && <CollectionDescription dangerouslySetInnerHTML={{ __html: collectionDescription }} /> }
                    </TitleGroup>
                </CollectionHeader>
                <ProductListingContainer>
                    {collectionProducts.map((product) => (
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
            setToProductCollectionPage,
        }) => (
                <ProductCollectionTemplate
                    {...props}
                    setPage={setToProductCollectionPage}
                />
            )}
    </InterfaceContext.Consumer>
)

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
                    descriptionHtml
                    handle
                    image {
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
