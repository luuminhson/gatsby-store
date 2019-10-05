// @flow
import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import Page from '../components/Page';
import Strip from '../components/Strip';
import type { AllMarkdownRemark } from '../types';

import InterfaceContext from '../context/InterfaceContext';
import { mediaQuery, spacing } from '../utils/styles';

type Props = {
  data: AllMarkdownRemark
};

const IndexWrapper = styled(`div`)`
  ${mediaQuery.desktop} {
    padding: 0 ${spacing.lg + 4}px;
  }
`;

class IndexTemplate extends React.Component<Props> {

  componentDidMount() {
    this.props.setPage();
  }

  render() {

    const { title, subtitle, description } = this.props.data.site.siteMetadata;
    const blogPost = this.props.data.blogStrip.edges;

    return (
      <Page title={`${title} ‧ ${subtitle}`} description={description} pageIs='Index'>
        <IndexWrapper>
          <Strip edges={blogPost} sectionTitle='Articles' sectionLink='/blog' sectionLinkLabel='See All' />
        </IndexWrapper>
      </Page>
    )
  }
}

export default props => (
  <InterfaceContext.Consumer>
    {({
      setToIndexPage,
    }) => (
        <IndexTemplate
          {...props}
          setPage={setToIndexPage}
        />
      )}
  </InterfaceContext.Consumer>
)

export const query = graphql`
  query IndexTemplate {
    site {
      siteMetadata {
        title
        subtitle
        description
      }
    }
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
