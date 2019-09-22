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
    margin-bottom: ${spacing.xs}px;
    padding: 0 ${spacing.xl}px;

    ${mediaQuery.tabletFrom} {
        padding: 0 ${spacing.md}px;
    }
`;

const RelatedProductsWrapper = styled(`div`)`
    margin: ${spacing['2xl']}px 0;
    padding: 0;

    ${mediaQuery.tabletFrom} {
        margin: ${spacing['4xl']}px 0;
        padding: 0 ${spacing['2xl']}px;
    }

    ${mediaQuery.desktop} {
        padding: 0 ${spacing['4xl']}px;
    }
`;

const RelatedProductList = styled(`div`)`
    overflow: hidden;
`;

const RelatedProductListInner = styled(`div`)`
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    padding: 0 ${spacing.lg + 4}px;
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
    padding: ${spacing.md}px;
    margin-bottom: ${spacing.lg}px;

    &:last-child {
        max-width: calc(60vw + ${spacing.xl - 4}px);
        padding-right: 44px;
    }

    ${mediaQuery.tabletFrom} {
        flex: 1 0 25%;
        max-width: none;

        &:last-child {
            padding-right: ${spacing.md}px;
        }
    }
`;

const RelatedProducts = ({ edges, limit }: Props) => {

    const randomRelatedProducts = _.sampleSize(edges, limit);
    const productList = limit ? randomRelatedProducts : edges;

    return (
        <RelatedProductsWrapper>
            <SectionTitleWrapper title='You Might Also Like' />
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
};

export default RelatedProducts;