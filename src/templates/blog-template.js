// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Page from '../components/Page';
import StaticSidebar from '../components/StaticSidebar';
import Feed from '../components/Feed';
import Pagination from '../components/Pagination';
import { useSiteMetadata, useCategoriesList, useTagsList } from '../hooks';
import type { PageContext, AllMarkdownRemark } from '../types';

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


  const { edges } = data.allMarkdownRemark;
  const pageTitle = currentPage > 0 ? `Blog - Page ${currentPage} ‧ ${title}` : `Blog ‧ ${title}`;

  return (
    <Layout title={pageTitle} description={description} isBlog>
      <Page isBlog withSidebar={hasSidebar} title='Blog'>
        <Feed edges={edges} />
        {hasNextPage &&
          <Pagination
            prevPagePath={prevPagePath}
            nextPagePath={nextPagePath}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
          />
        }
      </Page>
      {hasSidebar && <StaticSidebar isBlog />}
    </Layout>
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
