// @flow
import React from 'react';
import styled from '@emotion/styled';
import type { Edges } from '../../types';

import ProductListingItem from '../ProductListingItem';
import SectionTitle from '../SectionTitle';
import { spacing, mediaQuery } from '../../utils/styles';

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
        padding: 0 ${spacing.xs}px;
    }
`;

const RelatedProductsWrapper = styled(`div`)`
    margin: ${spacing.lg}px 0;

    ${mediaQuery.tabletFrom} {
        margin: ${spacing['4xl']}px 0;
        padding: 0 ${spacing.lg}px;
    }

    ${mediaQuery.desktop} {
        padding: 0 ${spacing['4xl']}px;
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
        update: false
    };

    componentDidUpdate(prevProps) {

        // Only update sample size when location changes

        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({ update: true });

            setTimeout(() => {
                this.setState({ update: false });
            }, 500);
        }
    }

    render() {
        const { edges, limit } = this.props;
        const { update } = this.state;

        const randomRelatedProducts = _.sampleSize(edges, limit);
        const productList = update && limit ? randomRelatedProducts : edges;

        return (
            <RelatedProductsWrapper>
                <SectionTitleWrapper>Có thể bạn sẽ thích</SectionTitleWrapper>
                <RelatedProductList>
                    <RelatedProductListInner>
                        {productList.map((edge) => (
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

export default RelatedProducts;