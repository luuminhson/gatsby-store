// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import CategoriesWidget from './CategoriesWidget';
import TagsWidget from './TagsWidget';
import { useCategoriesList, useTagsList } from '../../hooks';
import { mediaQuery } from '../../utils/styles';

type Props = {
  isIndex: bool,
  isBlog: bool,
};

const StaticSidebarWrapper = styled(`div`)``;

const StaticSidebarInner = styled(`div`)`
  padding: 25px 20px;

  ${mediaQuery.tabletFrom} {
    padding: 40px 35px;
  }
`;

const isIndexStyle = css``;
const isBlogStyle = css``;

const StaticSidebar = ({ isIndex, isBlog }: Props) => {
  const hasCategories = useCategoriesList().length > 0;
  const hasTags = useTagsList().length > 0;

  return (
    <StaticSidebarWrapper
      className={`${isIndex && isIndexStyle} ${isBlog && isBlogStyle}`}
    >
      <StaticSidebarInner>
        { hasCategories && <CategoriesWidget /> }
        { hasTags && <TagsWidget /> }
      </StaticSidebarInner>
    </StaticSidebarWrapper>
  );
};

export default StaticSidebar;
