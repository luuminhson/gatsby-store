// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import Feed from '../components/Feed';
import Pagination from '../components/Pagination';
import type { PageContext, AllMarkdownRemark } from '../types';

import InterfaceContext from '../context/InterfaceContext';

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

class CategoryTemplate extends React.Component<Props> {

  componentDidMount() {
    this.props.setPage();
  }

  render() {

    const { data, pageContext } = this.props;

    const { title: siteTitle, description: siteSubtitle } = data.site.siteMetadata;

    const {
      category,
      currentPage,
      prevPagePath,
      nextPagePath,
      hasPrevPage,
      hasNextPage,
    } = pageContext;

    const { edges } = data.allMarkdownRemark;
    const pageTitle = currentPage > 0 ? `${category} — Page ${currentPage} ‧ ${siteTitle}` : `${category} ‧ ${siteTitle}`;

    return (
      <Page pageTitle={category} mainTitle={category} title={pageTitle} description={siteSubtitle} pageIs='Blog'>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    )
  }
}

export default props => (
  <InterfaceContext.Consumer>
    {({
      setToBlogPage,
    }) => (
        <CategoryTemplate
          {...props}
          setPage={setToBlogPage}
        />
      )}
  </InterfaceContext.Consumer>
)

export const query = graphql`
  query CategoryPage($category: String, $postsLimit: Int!, $postsOffset: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
        limit: $postsLimit,
        skip: $postsOffset,
        filter: { frontmatter: { categories: { in: [$category] }, template: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            categorySlugs
            slug
          }
          frontmatter {
            date
            description
            categories
            title
            featuredImage {
              childImageSharp {
                resize(width: 1500, height: 1500) {
                  src
                }
                fluid(maxWidth: 1100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
