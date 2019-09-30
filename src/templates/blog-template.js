// @flow
import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Page, { PageBody } from '../components/Page/Page';
import StaticSidebar from '../components/StaticSidebar';
import Feed from '../components/Feed';
import Pagination from '../components/Pagination';
import type { PageContext, AllMarkdownRemark } from '../types';

import InterfaceContext from '../context/InterfaceContext';
import { mediaQuery, spacing } from '../utils/styles';

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

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

    const PageStyle = css`
      ${PageBody} {
        justify-content: space-between;
        padding-top: ${spacing.sm}px;

        ${mediaQuery.tabletFrom} {
          display: ${hasSidebar ? 'flex' : 'block'};
        }
      }
    `;

    const FeedWrapper = styled(`div`)`
      flex: 1 0 100%;

      ${mediaQuery.tabletFrom} {
        flex: 1 0 ${hasSidebar && '65%'};
      }
    `;

    const SidebarStyle = css`
      flex: 1 0 100%;

      ${mediaQuery.tabletFrom} {
        flex: 1 0 30%;
      }
    `;

    return (
      <Page mainTitle='Blog' css={PageStyle} withSidebar={hasSidebar} title={pageTitle} description={description} pageIs='Blog'>
        <FeedWrapper>
          <Feed edges={edges} />
          {hasNextPage &&
            <Pagination
              prevPagePath={prevPagePath}
              nextPagePath={nextPagePath}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
            />
          }
        </FeedWrapper>
        {hasSidebar && <StaticSidebar css={SidebarStyle} />}
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
