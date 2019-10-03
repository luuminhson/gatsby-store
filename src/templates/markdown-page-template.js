// @flow
import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Page from '../components/Page';
import type { MarkdownRemark } from '../types';

import InterfaceContext from '../context/InterfaceContext';
import { spacing } from '../utils/styles';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const PageTemplateWrapper = styled(`div`)`
  padding: 0 ${spacing.lg}px ${spacing.lg}px;
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
      <Page mainTitle={pageTitle} title={`${pageTitle} ‧ ${siteTitle}`} description={metaDescription} pageIs='Page'>
        <PageTemplateWrapper>
          <div dangerouslySetInnerHTML={{ __html: pageBody }} />
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
