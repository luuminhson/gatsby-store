// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Link } from '../LinkWithPrev';
import Img from 'gatsby-image';
import Button from '../Button';
import type { Edges } from '../../types';

import { shadow, colors, FontStyle } from '../../utils/styles';

type Props = {
  edges: Edges
};

const FeedItem = styled(`div`)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 24px;
  background: ${colors.white};
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: ${shadow.blockItemShadow};

  &:last-child {
    margin-bottom: 8px;
  }
`;

const PostThumbnail = styled(Img)`
  width: 100%;
  height: 200px;
  overflow: hidden;
  box-sizing: border-box;
`;

const FeedItemContent = styled(`div`)`
  padding: 0;
`;

const FeedItemTitle = styled(FontStyle.h3)`
  margin: 12px 0;
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
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 8px;
`;

const Readmore = styled(Button)`
  margin-left: -0.7rem;
`;

const hasFeaturedImage = css`
  padding: 0;

  ${FeedItemContent} {
    padding: 24px;
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
          <Readmore link={edge.node.fields.slug} label='Read More' onDark />
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
        <Readmore link={edge.node.fields.slug} label='Read More' onDark />
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
