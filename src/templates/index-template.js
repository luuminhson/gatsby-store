// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Page from '../components/Page';
import Strip from '../components/Strip';
import { useSiteMetadata } from '../hooks';
import type { AllMarkdownRemark } from '../types';

type Props = {
  data: AllMarkdownRemark
};

const IndexTemplate = ({ data }: Props) => {
  const { title, subtitle, description } = useSiteMetadata();

  const blogPost = data.blogStrip.edges;

  return (
    <Layout title={`${title} ‧ ${subtitle}`} description={description} isIndex>
      <Page isIndex>
        <Strip edges={blogPost} sectionTitle='Articles' sectionLink='/blog' sectionLinkLabel='See All' />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query IndexTemplate {
    blogStrip: allMarkdownRemark(
        limit: 5,
        skip: 0,
        filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } },
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
                resize(width: 500, height: 500) {
                  src
                }
                fluid(maxWidth: 900) {
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

export default IndexTemplate;
