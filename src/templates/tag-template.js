// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { useSiteMetadata } from '../hooks';
import type { AllMarkdownRemark, PageContext } from '../types';

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

const TagTemplate = ({ data, pageContext }: Props) => {
  const { title: siteTitle, description: siteSubtitle } = useSiteMetadata();

  const {
    tag,
    currentPage,
    prevPagePath,
    nextPagePath,
    hasPrevPage,
    hasNextPage
  } = pageContext;

  const { edges } = data.allMarkdownRemark;
  const pageTitle = currentPage > 0 ? `All Posts tagged as "${tag}" — Page ${currentPage} ‧ ${siteTitle}` : `All Posts tagged as "${tag}" ‧ ${siteTitle}`;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Page title={'Tag: ' + tag} isBlog>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query TagPage($tag: String, $postsLimit: Int!, $postsOffset: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
        limit: $postsLimit,
        skip: $postsOffset,
        filter: { frontmatter: { tags: { in: [$tag] }, template: { eq: "post" }, draft: { ne: true } } },
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

export default TagTemplate;
