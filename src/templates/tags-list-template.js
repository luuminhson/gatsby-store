import React from 'react';
import { Link } from '../components/LinkWithPrev';
import kebabCase from 'lodash/kebabCase';
import Page from '../components/Page';
import { useSiteMetadata, useTagsList } from '../hooks';

const TagsListTemplate = () => {
  const { title, description } = useSiteMetadata();
  const tags = useTagsList();

  return (
      <Page pageTitle='Tags' title={`Tags ‧ ${title}`} description={description} isBlog>
        <ul>
          {tags.map((tag) => (
            <li key={tag.fieldValue}>
              <Link to={`/blog/tag/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
  );
};

export default TagsListTemplate;