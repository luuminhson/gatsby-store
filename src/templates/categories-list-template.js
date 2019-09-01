import React from 'react';
import { Link } from '../components/LinkWithPrev';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata, useCategoriesList } from '../hooks';

const CategoriesListTemplate = () => {
  const { title, description } = useSiteMetadata();
  const categories = useCategoriesList();

  return (
    <Layout title={`Categories ‧ ${title}`} description={description}>
      <Page title="Categories">
        <ul>
          {categories.map((category) => (
            <li key={category.fieldValue}>
              <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default CategoriesListTemplate;