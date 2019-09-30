import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import { Link } from '../components/LinkWithPrev';
import kebabCase from 'lodash/kebabCase';
import type { PageContext, AllMarkdownRemark } from '../types';

import InterfaceContext from '../context/InterfaceContext';

type Props = {
  data: AllMarkdownRemark
};

class CategoriesListTemplate extends React.Component<Props> {

  componentDidMount() {
    this.props.setPage();
  }

  render() {

    const { data } = this.props;

    const { title, description } = data.site.siteMetadata;
    const categories = data.categoryList.group;

    return (
      <Page pageTitle='Categories' title={`Categories ‧ ${title}`} description={description} pageIs='Blog'>
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
