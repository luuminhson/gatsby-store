// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from '../../LinkWithPrev';
import { dimensions, colors } from '../../../utils/styles';

type Props = {
  tags: string[],
  tagSlugs: string[]
};

const TagWrapper = styled(`div`)`
  margin-bottom: 8px;
`;

const TagList = styled(`ul`)`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: inline-block;
      margin: 10px 10px 0 0;
      padding: 0;
  }
`;

const TagLink = css`
  display: inline-block;
  padding: 4px 16px;
  background-color: ${colors.neutral1};
  text-decoration: none;
  border-radius: 20px;
  color: ${colors.mainDark};

  &:hover,
  &:focus {
    color: ${colors.mainClickable};
  }
`;

const Tags = ({ tags, tagSlugs }: Props) => (
  <TagWrapper>
    <TagList>
      {tagSlugs && tagSlugs.map((slug, i) => (
        <li key={tags[i]}>
          <Link to={slug} css={TagLink}>
            {tags[i]}
          </Link>
        </li>
      ))}
    </TagList>
  </TagWrapper>
);

export default Tags;
