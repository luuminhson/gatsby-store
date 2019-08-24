// @flow
import React from 'react';
import { Link } from '../../LinkWithPrev';
import styled from '@emotion/styled';

type Props = {
  categories: string[],
  categorySlugs: string[],
  className: string
};

const CategoryWrapper = styled(`div`)`
  display: inline-block;
`;

const CategoryList = styled(`ul`)`
  padding: 0;
  margin: 0;
  list-style: none;
  display: inline-block;

  li {
      display: inline-block;
      padding: 0;
      margin: 0 2px;
  }
`;

const Categories = ({ categories, categorySlugs, className }: Props) => (
  <CategoryWrapper className={className}>
    <CategoryList>
      {categorySlugs && categorySlugs.map((slug, i) => (
        <li key={categories[i]}>
          <Link to={slug}>
            {categories[i]}
          </Link>
        </li>
      ))}
    </CategoryList>
  </CategoryWrapper>
);

export default Categories;
