import React from 'react';
import Page from '../components/Page';
import { Link } from '../components/LinkWithPrev';
import kebabCase from 'lodash/kebabCase';
import { useSiteMetadata, useCategoriesList } from '../hooks';

const CategoriesListTemplate = () => {
  const { title, description } = useSiteMetadata();
  const categories = useCategoriesList();

  return (
    <Page pageTitle='Categories' title={`Categories ‧ ${title}`} description={description} isBlog>
      <ul>
        {categories.map((category) => (
          <li key={category.fieldValue}>
            <Link to={`/blog/category/${kebabCase(category.fieldValue)}/`}>
              {category.fieldValue} ({category.totalCount})
              </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default CategoriesListTemplate;