// @flow
import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Page from '../components/Page/Page';
import StaticSidebar from '../components/StaticSidebar';
import Feed from '../components/Feed';
import Pagination from '../components/Pagination';
import type { PageContext, AllMarkdownRemark } from '../types';

import InterfaceContext from '../context/InterfaceContext';
import { mediaQuery, spacing, dimensions } from '../utils/styles';

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

const FeedWrapper = styled(`div`)`
  max-width: ${dimensions.blogPageWidth};
  margin: 0 auto;
  padding: ${spacing.md - 4}px ${spacing.lg}px ${spacing.xl}px;

  ${mediaQuery.tabletFrom} {
    padding: ${spacing.md - 4}px ${spacing.xl}px ${spacing['2xl']}px;
  }
`;

class BlogTemplate extends React.Component<Props> {

  componentDidMount() {
    this.props.setPage();
  }

  render() {

    const { data, pageContext } = this.props;

    const { title, description } = data.site.siteMetadata;
    const hasCategories = data.categoryList.group.length > 0;
    const hasTags = data.tagList.group.length > 0;
    const hasSidebar = (hasCategories || hasTags);

    const {
      currentPage,
      hasNextPage,
      hasPrevPage,
      prevPagePath,
      nextPagePath
    } = pageContext;

    const { edges } = data.postList;
    const pageTitle = currentPage > 0 ? `Blog - Page ${currentPage} ‧ ${title}` : `Blog ‧ ${title}`;

    return (
      <Page mainTitle='Blog' withSidebar={hasSidebar} title={pageTitle} description={description} pageIs='Blog'>
        {console.log(hasPrevPage)}
        <FeedWrapper>
          <Feed edges={edges} />
          {(hasNextPage || hasPrevPage) &&
            <Pagination
              prevPagePath={prevPagePath}
              nextPagePath={nextPagePath}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
            />
          }
          {/* {hasSidebar && <StaticSidebar />} */}
        </FeedWrapper>
      </Page>
    )
  }
}

export default props => (
  <InterfaceContext.Consumer>
    {({
      setToBlogPage
    }) => (
        <BlogTemplate
          {...props}
          setPage={setToBlogPage}
        />
      )}
  </InterfaceContext.Consumer>
)

export const query = graphql`
  query BlogTemplate($postsLimit: Int!, $postsOffset: Int!) {
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
    tagList: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
    postList: allMarkdownRemark(
        limit: $postsLimit,
        skip: $postsOffset,
        filter: { frontmatter: { categories: { nin: ["Work"] }, template: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlugs
          }
          frontmatter {
            title
            date
            categories
            description
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
