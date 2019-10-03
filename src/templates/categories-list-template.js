// @flow
import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Page from '../components/Page';
import { Link } from '../components/LinkWithPrev';
import kebabCase from 'lodash/kebabCase';
import type { PageContext, AllMarkdownRemark } from '../types';

import { spacing, fontWeight, radius, colors } from '../utils/styles';

import InterfaceContext from '../context/InterfaceContext';

type Props = {
  data: AllMarkdownRemark
};

const CategoriesTemplateWrapper = styled(`div`)`
  padding: 0 ${spacing.lg}px ${spacing.lg}px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: ${spacing.sm}px ${spacing.xs}px;
      padding: 0;

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

class CategoriesListTemplate extends React.Component<Props> {

  componentDidMount() {
    this.props.setPage();
  }

  render() {

    const { data } = this.props;

    const { title, description } = data.site.siteMetadata;
    const categories = data.categoryList.group;

    return (
      <Page pageTitle='Categories' mainTitle='Categories' title={`Categories ‧ ${title}`} description={description} pageIs='Blog'>
        <CategoriesTemplateWrapper>
          <ul>
            {categories.map((category) => (
              <li key={category.fieldValue}>
                <Link to={`/blog/category/${kebabCase(category.fieldValue)}/`}>
                  {category.fieldValue} ({category.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </CategoriesTemplateWrapper>
      </Page>
    )
  }
}

export default props => (
  <InterfaceContext.Consumer>
    {({
      setToBlogPage,
    }) => (
        <CategoriesListTemplate
          {...props}
          setPage={setToBlogPage}
        />
      )}
  </InterfaceContext.Consumer>
)

export const query = graphql`
  query CategoryListTemplate {
    site {
      siteMetadata {
        title
        description
      }
    }
    categoryList: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
