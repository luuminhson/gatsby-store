// @flow
import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Location } from '@reach/router';
import Page from '../components/Page';
import Post from '../components/Post';
import type { MarkdownRemark } from '../types';

import InterfaceContext from '../context/InterfaceContext';
import { delay } from 'q';

type Props = {
  data: MarkdownRemark
};

class PostTemplate extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      featureImage: null !== this.props.data.markdownRemark.frontmatter.featuredImage
    };
  }

  componentDidMount() {
    this.props.setPage();
    this.props.setBackLink();
  }

  render() {

    const { site } = this.props.data;
    const { title: postTitle, description: postDescription } = this.props.data.markdownRemark.frontmatter;
    const metaDescription = postDescription !== null ? postDescription : siteDescription;

    const { prevLink } = this.props;

    return (
      <Page title={`${postTitle} ‧ ${site.siteMetadata.title}`} description={metaDescription} from={prevLink} pageIs='Post'>
        <Post post={this.props.data.markdownRemark} />
      </Page>
    )
  }
}

export default props => (
  <Location>
    {({ location }) => (
      <InterfaceContext.Consumer>
        {({
          setToPostPage,
          prevLink,
          setPrevLink,
        }) => (
            <PostTemplate
              {...props}
              setPage={setToPostPage}
              setBackLink={() => setPrevLink(location, '/blog')}
              prevLink={prevLink}
            />
          )}
      </InterfaceContext.Consumer>
    )}
  </Location>
)


export const query = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }

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
