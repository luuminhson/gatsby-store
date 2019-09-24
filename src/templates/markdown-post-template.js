// @flow
import React from 'react';
import { graphql } from 'gatsby';
import { Location } from '@reach/router';
import Page from '../components/Page';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

type Props = {
  data: MarkdownRemark
};

const PostTemplate = ({ data }: Props) => {
  const { title: siteTitle, description: siteDescription } = useSiteMetadata();
  const { title: postTitle, description: postDescription } = data.markdownRemark.frontmatter;
  const metaDescription = postDescription !== null ? postDescription : siteDescription;
  const hasFeaturedImage = null !== data.markdownRemark.frontmatter.featuredImage;

  const checkLocationState = (location) => {
    const locationState = location.state;

    if (locationState == null) {
      return '/blog';
    } else {
      const hasLocationState = location.state.hasOwnProperty('prevUrl');
      const passedBackLink = hasLocationState ? location.state.prevUrl : '/blog';

      return passedBackLink;
    }
  }

  return (
    <Location>
      {({ location }) => (
        <Page title={`${postTitle} ‧ ${siteTitle}`} description={metaDescription} isPost detailTitle={postTitle} hasFeaturedImage={hasFeaturedImage} from={checkLocationState(location)}>
          <Post post={data.markdownRemark} />
        </Page>
      )}
    </Location>
  );
};


export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
        categorySlugs
      }
      frontmatter {
        date
        description
        tags
        title
        categories
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
`;


export default PostTemplate;
