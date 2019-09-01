import React from 'react';
import { Link } from '../components/LinkWithPrev';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata, useTagsList } from '../hooks';

const TagsListTemplate = () => {
  const { title, description } = useSiteMetadata();
  const tags = useTagsList();

  return (
    <Layout title={`Tags ‧ ${title}`} description={description}>
      <Page title="Tags">
        <ul>
          {tags.map((tag) => (
            <li key={tag.fieldValue}>
              <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default TagsListTemplate;