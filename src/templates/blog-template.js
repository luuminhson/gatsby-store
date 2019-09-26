// @flow
import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Page, { PageBody } from '../components/Page/Page';
import StaticSidebar from '../components/StaticSidebar';
import Feed from '../components/Feed';
import Pagination from '../components/Pagination';
import { useSiteMetadata, useCategoriesList, useTagsList } from '../hooks';
import type { PageContext, AllMarkdownRemark } from '../types';

import { mediaQuery, spacing } from '../utils/styles';

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

const BlogTemplate = ({ data, pageContext }: Props) => {
  const { title, description } = useSiteMetadata();
  const hasCategories = useCategoriesList().length > 0;
  const hasTags = useTagsList().length > 0;
  const hasSidebar = (hasCategories || hasTags);

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath
  } = pageContext;

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
    width: 100%;

    ${mediaQuery.tabletFrom} {
      width: ${hasSidebar && '65%'};
    }
  `;

  const SidebarStyle = css`
    width: 100%;

    ${mediaQuery.tabletFrom} {
      width: 30%;
    }
  `;

  const { edges } = data.allMarkdownRemark;
  const pageTitle = currentPage > 0 ? `Blog - Page ${currentPage} ‧ ${title}` : `Blog ‧ ${title}`;

  return (
    <Page mainTitle='Blog' css={PageStyle} withSidebar={hasSidebar} title={pageTitle} description={description} isBlog>
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
      {hasSidebar && <StaticSidebar css={SidebarStyle} isBlog />}
    </Page>
  );
};

export const query = graphql`
  query BlogTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allMarkdownRemark(
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

export default BlogTemplate;
