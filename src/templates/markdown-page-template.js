// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import type { MarkdownRemark } from '../types';

import InterfaceContext from '../context/InterfaceContext';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

class PageTemplate extends React.Component<Props> {

  componentDidMount() {
    this.props.setPage();
  }

  render() {

    const { data } = this.props;

    const { title: siteTitle, description: siteSubtitle } = data.site.siteMetadata;
    const { html: pageBody } = data.markdownRemark;
    const { title: pageTitle, description: pageDescription } = data.markdownRemark.frontmatter;
    const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle;

    return (
      <Page pageTitle={pageTitle} title={`${pageTitle} ‧ ${siteTitle}`} description={metaDescription} pageIs='Page'>
        <div dangerouslySetInnerHTML={{ __html: pageBody }} />
      </Page>
    )
  }
}

export default props => (
  <InterfaceContext.Consumer>
    {({
      setToPagePage,
    }) => (
        <PageTemplate
          {...props}
          setPage={setToPagePage}
        />
      )}
  </InterfaceContext.Consumer>
)

export const query = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
      }
    }
  }
`;
