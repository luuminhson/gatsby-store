// @flow
import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Link } from '../components/LinkWithPrev';
import kebabCase from 'lodash/kebabCase';
import Page from '../components/Page';
import type { PageContext, AllMarkdownRemark } from '../types';

import { spacing, fontWeight, radius, colors } from '../utils/styles';

import InterfaceContext from '../context/InterfaceContext';

type Props = {
  data: AllMarkdownRemark
};

const TagTemplateWrapper = styled(`div`)`
  padding: 0 ${spacing.lg}px ${spacing.lg}px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: ${spacing.xs}px;
      padding: 0;
      display: inline-block;

      a {
        display: block;
        background-color: ${colors.neutral1};
        color: ${colors.mainDark};
        font-weight: ${fontWeight.body.medium};
        padding: ${spacing.xs}px ${spacing.sm}px;
        border-radius: ${radius.large}px;
      }
    }
  }
`;

class TagsListTemplate extends React.Component<Props> {

  componentDidMount() {
    this.props.setPage();
  }

  render() {

    const { data } = this.props;

    const { title, description } = data.site.siteMetadata;
    const tags = data.tagList.group;

    return (
      <Page pageTitle='Tags' title={`Tags ‧ ${title}`} description={description} pageIs='Blog'>
        <TagTemplateWrapper>
          <ul>
            {tags.map((tag) => (
              <li key={tag.fieldValue}>
                <Link to={`/blog/tag/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </TagTemplateWrapper>
      </Page>
    )
  }
}

export default props => (
  <InterfaceContext.Consumer>
    {({
      setToBlogPage,
    }) => (
        <TagsListTemplate
          {...props}
          setPage={setToBlogPage}
        />
      )}
  </InterfaceContext.Consumer>
)

export const query = graphql`
  query TagListTemplate {
    site {
      siteMetadata {
        title
        description
      }
    }
    tagList: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
