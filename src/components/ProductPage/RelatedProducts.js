// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import type { Edges } from '../../types';

import ProductListingItem from '../ProductListingItem';
import SectionTitle, { Title } from '../SectionTitle';
import { spacing, breakpoints, mediaQuery } from '../../utils/styles';

type Props = {
    edges: Edges,
    limit: number
};

const _ = require('lodash');

const SectionTitleWrapper = styled(SectionTitle)`
    margin-bottom: ${spacing.md}px;
    padding: 0 ${spacing.lg}px;

    ${mediaQuery.tabletFrom} {
        margin-bottom: ${spacing.xl}px;
        padding: 0;
    }

    ${Title} {
        font-size: 2rem;
        line-height: 2.25rem;
        margin-bottom: 0;
    }
`;

const RelatedProductsWrapper = styled(`div`)`
    margin: ${spacing.lg}px auto;
    max-width: ${breakpoints.hd}px;

    ${mediaQuery.tabletFrom} {
        margin: ${spacing['4xl']}px auto;
        padding: 0 ${spacing.xl}px;
    }

    ${mediaQuery.desktopLarge} {
        padding: 0;
    }
`;

const RelatedProductList = styled(`div`)`
    overflow: hidden;
    height: 320px;

    ${mediaQuery.tabletFrom} {
        height: auto;
    }
`;

const RelatedProductListInner = styled(`div`)`
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    padding: 0 ${spacing.lg}px;
    margin: 0 -${spacing.sm}px;
    transform: translateZ(0);

    ${mediaQuery.tabletFrom} {
        scroll-snap-type: none;
        margin: 0 -${spacing.xl}px;
    }
`;

const RelatedProductItem = styled(`div`)`
    flex: 1 0 100%;
    max-width: 60vw;
    scroll-snap-align: center;
    position: relative;
    padding: ${spacing.sm}px;
    margin-bottom: ${spacing.lg}px;

    &:last-child {
        max-width: calc(60vw + ${spacing.lg}px);
        padding-right: ${spacing.lg + spacing.sm}px;
    }

    > a {
        display: block;
        margin: 0;
    }

    ${mediaQuery.tabletFrom} {
        flex: 1 0 25%;
        max-width: none;

        &:last-child {
            padding-right: ${spacing.sm}px;
        }
    }
`;

class RelatedProducts extends React.Component<Props> {
    state = {
        longTailedProducts: _.concat(
            // Filtered products with the same type, limited
            _.sampleSize(
                _.filter(this.props.edges, (item) => (
                    item.node.productType == this.props.product.productType && item.node.id !== this.props.product.id
                )),
                this.props.limit
            ),

            // All the rest products, shuffled
            _.shuffle(
                _.xor(
                    _.filter(this.props.edges, (item) => (item.node.productType == this.props.product.productType)),
                    this.props.edges
                )
            )
        )
    };

    render() {
        const { limit } = this.props;
        const { longTailedProducts } = this.state;

        const finalList = _.slice(longTailedProducts, 0, limit);

        return (
            <RelatedProductsWrapper>
                <SectionTitleWrapper>Có thể bạn sẽ thích</SectionTitleWrapper>
                <RelatedProductList>
                    <RelatedProductListInner>
                        {finalList.map((edge) => (
                            <RelatedProductItem key={edge.node.id}>
                                <ProductListingItem product={edge.node} />
                            </RelatedProductItem>
                        ))}
                    </RelatedProductListInner>
                </RelatedProductList>
            </RelatedProductsWrapper>
        )
    }
}

RelatedProducts.propTypes = {
    limit: PropTypes.number.isRequired,
  };

export default RelatedProducts;