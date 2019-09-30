// @flow
import React from 'react';
import styled from '@emotion/styled';
import CategoriesWidget from './CategoriesWidget';
import TagsWidget from './TagsWidget';
import { useCategoriesList, useTagsList } from '../../hooks';
import { mediaQuery, spacing } from '../../utils/styles';

const StaticSidebarWrapper = styled(`div`)``;

const StaticSidebarInner = styled(`div`)`
  padding: 24px ${spacing.sm}px;

  > * {
    margin: 0 0 ${spacing.lg}px;
  }

  ${mediaQuery.tabletFrom} {
    padding: 0 ${spacing.xl}px;
  }
`;

const StaticSidebar = () => {
  const hasCategories = useCategoriesList().length > 0;
  const hasTags = useTagsList().length > 0;

  return (
    <StaticSidebarWrapper>
      <StaticSidebarInner>
        { hasCategories && <CategoriesWidget /> }
        { hasTags && <TagsWidget /> }
      </StaticSidebarInner>
    </StaticSidebarWrapper>
  );
};

export default StaticSidebar;
