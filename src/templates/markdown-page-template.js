// @flow
import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Page from '../components/Page';
import type { MarkdownRemark } from '../types';

import InterfaceContext from '../context/InterfaceContext';
import { spacing, mediaQuery, dimensions, FontStyle } from '../utils/styles';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const PageTemplateWrapper = styled(`div`)`
  padding: 0 ${spacing.lg}px ${spacing.lg}px;
  margin: 0 auto;

  ${mediaQuery.tabletFrom} {
    max-width: ${dimensions.blogWithSidebarPageWidth};
    padding: 0 ${spacing.xl + 4}px ${spacing.xl}px;
  }

  ${mediaQuery.desktop} {
    padding: 0 ${spacing['4xl']}px ${spacing.lg}px;
  }
`;

const PageBody = styled(`div`)`
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.25em;
  }

  p {
    line-height: 1.8rem;
  }
`;

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
        <PageTemplateWrapper>
          <PageBody dangerouslySetInnerHTML={{ __html: pageBody }} />
        </PageTemplateWrapper>
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
