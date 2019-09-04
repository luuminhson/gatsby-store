// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from '../LinkWithPrev';
import Img from 'gatsby-image';
import { FlatButton } from '../shared/Buttons';
import type { Edges } from '../../types';

import { shadow, colors, spacing, FontStyle, radius, mediaQuery } from '../../utils/styles';

type Props = {
  edges: Edges
};

const FeedItem = styled(`div`)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: ${spacing.md}px ${spacing.lg}px;
  background: ${colors.white};
  margin-bottom: ${spacing.xl}px;
  overflow: hidden;
  border-radius: ${radius.large}px;
  box-shadow: ${shadow.blockItemShadow};

  &:last-child {
    margin-bottom: 8px;
  }

  ${mediaQuery.tabletFrom} {
    margin-bottom: ${spacing['2xl']}px;
  }
`;

const PostThumbnail = styled(Img)`
  width: 100%;
  height: 200px;
  overflow: hidden;
  box-sizing: border-box;

  ${mediaQuery.tabletFrom} {
    height: 280px;
  }
`;

const FeedItemContent = styled(`div`)`
  padding: 0;
`;

const FeedItemTitle = styled(FontStyle.h3)`
  margin: ${spacing.sm}px 0;
`;

const FeedItemTitleLink = styled(Link)`
  color: ${colors.mainDark};
    
  &:hover,
  &:focus {
    color: ${colors.mainDark};
    border-bottom: 1px solid ${colors.mainDark};
  }
`;

const FeedItemDescription = styled(`p`)`
  margin-bottom: 8px;
  max-height: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* number of lines to show */
`;

const Readmore = styled(FlatButton)`
  margin-left: -1.125rem;
`;

const hasFeaturedImage = css`
  padding: 0;

  ${FeedItemContent} {
    padding: ${spacing.md}px ${spacing.lg}px;
  }
`;

const feedLayout = (edge) => {
  if (edge.node.frontmatter.featuredImage) {
    return (
      <div>
        <Link to={edge.node.fields.slug}>
          <PostThumbnail fluid={edge.node.frontmatter.featuredImage.childImageSharp.fluid} />
        </Link>
        <FeedItemContent>
          <FeedItemTitle>
            <FeedItemTitleLink to={edge.node.fields.slug}>
              {edge.node.frontmatter.title}
            </FeedItemTitleLink>
          </FeedItemTitle>
          <FeedItemDescription>{edge.node.frontmatter.description}</FeedItemDescription>
          <Readmore to={edge.node.fields.slug}>Read More</Readmore>
        </FeedItemContent>
      </div>
    );
  } else {
    return (
      <FeedItemContent>
        <FeedItemTitle>
          <FeedItemTitleLink to={edge.node.fields.slug}>
            {edge.node.frontmatter.title}
          </FeedItemTitleLink>
        </FeedItemTitle>
        <FeedItemDescription>{edge.node.frontmatter.description}</FeedItemDescription>
        <Readmore to={edge.node.fields.slug}>Read More</Readmore>
      </FeedItemContent>
    );
  }
}

const Feed = ({ edges }: Props) => (
  <>
    {edges.map((edge) => (
      <FeedItem
        css={edge.node.frontmatter.featuredImage && hasFeaturedImage}
        key={edge.node.fields.slug}
      >
        {feedLayout(edge)}
      </FeedItem>
    ))}
  </>
);

export default Feed;
