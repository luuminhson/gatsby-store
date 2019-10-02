// @flow
import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Page from '../components/Page';
import Feed from '../components/Feed';
import Pagination from '../components/Pagination';
import type { AllMarkdownRemark, PageContext } from '../types';

import InterfaceContext from '../context/InterfaceContext';

import { mediaQuery, spacing, dimensions } from '../utils/styles';

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

const FeedWrapper = styled(`div`)`
  max-width: ${dimensions.blogPageWidth};
  margin: 0 auto;
  padding: ${spacing.md - 4}px ${spacing.lg}px;

  ${mediaQuery.tabletFrom} {
    padding: ${spacing.md - 4}px ${spacing.xl}px;
  }
`;

class TagTemplate extends React.Component<Props> {

  componentDidMount() {
    this.props.setPage();
  }

  render() {

    const { data, pageContext } = this.props;

    const { title: siteTitle, description: siteSubtitle } = data.site.siteMetadata;

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
      <Page pageTitle={'Tag: ' + tag} mainTitle={'Tag: ' + tag} title={pageTitle} description={siteSubtitle} pageIs='Blog'>
        <FeedWrapper>
          <Feed edges={edges} />
          <Pagination
            prevPagePath={prevPagePath}
            nextPagePath={nextPagePath}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
          />
        </FeedWrapper>
      </Page>
    )
  }
}

export default props => (
  <InterfaceContext.Consumer>
    {({
      setToBlogPage,
    }) => (
        <TagTemplate
          {...props}
          setPage={setToBlogPage}
        />
      )}
  </InterfaceContext.Consumer>
)

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
