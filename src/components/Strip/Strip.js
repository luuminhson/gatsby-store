// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from '../LinkWithPrev';
import moment from 'moment';
import Img from 'gatsby-image';
import SectionTitle from '../SectionTitle';
import type { Edges } from '../../types';

import { mediaQuery, shadow, colors, fontFamily, radius } from '../../utils/styles';

type Props = {
    edges: Edges,
    sectionTitle: string,
    sectionLink: String,
    sectionLinkLabel: string
};

const cardWidth = '75vw';
const scrollbarHiddenPadding = '4.2rem';

const Wrapper = styled(`div`)`
    margin: 0 -0.75rem;
    height: 380px;
    overflow: hidden;

    ${mediaQuery.tabletFrom} {
        height: auto;
        margin: 0 -1rem;
    }
`;

const StripWrapper = styled(`div`)`
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    padding: 0 0.75rem;
    margin-top: 16px;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    transform: translate3d(0,0,0);

    ${mediaQuery.tabletFrom} {
        scroll-snap-type: none;
        overflow: visible;
        flex-wrap: wrap;
        padding-bottom: 20px;
    }
`;

const StripItem = styled(`div`)`
    flex: 1 0 100%;
    position: relative;
    scroll-snap-align: center;
    max-width: ${cardWidth};
    margin-bottom: ${scrollbarHiddenPadding};
    padding: 0 0.75rem;
    transform: translate3d(0,0,0);

    &:last-child {
        padding-right: 1.5rem;
    }

    &.has-featured-image {
        .strip-item-inner {
            .postThumbnail {
                width: 100%;
                height: 160px;
                overflow: hidden;
                box-sizing: border-box;
                border-radius: ${radius.large}px;
            }
        }
    }

    .strip-item-inner {
        display: flex;
        align-items: flex-end;
        overflow: hidden;
        background-color: ${colors.white};
    }

    ${mediaQuery.tabletFrom} {
        flex-basis: 33.3333%;
        max-width: calc(33.3333%);
        padding: 0 1rem;
        margin-bottom: 32px;

        &.has-featured-image {
            .strip-item-inner {
                .postThumbnail {
                    height: 240px;
                }
            }
        }
    }
`;

const ItemLink = styled(Link)`
    display: block;
    width: 100%;
`;

const ItemInfo = styled(`div`)`
    flex: 1 0 100%;
    padding: 16px 4px 0;
    max-width: 100%;
    box-sizing: border-box;

    .info-title {
        color: ${colors.mainDark};
        font-family: ${fontFamily.heading};
        font-size: 1.1rem;
        line-height: 24px;
        max-height: 56px;
        margin: 0 0 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* number of lines to show */

        &-link {
            color: ${colors.mainDark};
        }
    }

    .info-date {
        display: block;
        font-size: 14px;
        line-height: 20px;
        color: ${colors.neutral4};
    }
`;

const SectionTitleStyle = css`
    padding: 0 1.5rem;

    ${mediaQuery.tabletFrom} {
        padding: 0 1.75rem;
    }
`;

const StripLayout = (edge) => {
    if (edge.node.frontmatter.featuredImage) {
        return (
            <ItemLink to={edge.node.fields.slug}>
                <Img
                    className={'postThumbnail'}
                    fluid={edge.node.frontmatter.featuredImage.childImageSharp.fluid}
                />
                <ItemInfo>
                    <h3 className='info-title'>{edge.node.frontmatter.title}</h3>
                    <span className='info-date'>{moment(edge.node.frontmatter.date).format('D MMMM, YYYY')}</span>

                </ItemInfo>
            </ItemLink>
        );
    } else {
        return (
            <ItemInfo>
                <h3 className='info-title'>
                    <Link className='info-title-link' to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
                </h3>
                <span className='info-date'>{moment(edge.node.frontmatter.date).format('D MMMM, YYYY')}</span>
            </ItemInfo>
        );
    }
}

const Strip = ({ edges, sectionTitle, sectionLink, sectionLinkLabel }: Props) => (
    <Wrapper>
        <SectionTitle css={SectionTitleStyle} title={sectionTitle} actionLink={sectionLink} actionLabel={sectionLinkLabel} />
        <StripWrapper>
            {edges.map((edge) => (
                <StripItem className={edge.node.frontmatter.featuredImage && 'has-featured-image'} key={edge.node.fields.slug}>
                    <div className='strip-item-inner'>
                        {StripLayout(edge)}
                    </div>
                </StripItem>
            ))}
        </StripWrapper>
    </Wrapper>
);

export default Strip;
