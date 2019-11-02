// @flow
import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import ScrollAnimation from '../components/shared/ScrollAnimation';
import Page from '../components/Page';
import Footer from '../components/Layout/Footer';
import type { MarkdownRemark } from '../types';

import InterfaceContext from '../context/InterfaceContext';
import { colors, mediaQuery, spacing } from '../utils/styles';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const CustomFooter = styled(Footer)`
    background-color: ${colors.white};
    padding: ${spacing.sm}px 0 0;

    > div > div {
            :nth-of-type(1) {
                border-top: 1px solid ${colors.neutral2};

                ${mediaQuery.tabletFrom} {
                    border-top: none;
                }
            }
    }
`;

class MoreTemplate extends React.Component<Props> {

  componentDidMount() {
    this.props.setPage();
  }

  render() {

    const { data, viewportIs } = this.props;

    const { title: siteTitle, description: siteSubtitle } = data.site.siteMetadata;

    if (viewportIs !== null) {
      return null;
    }

    return (
      <Page pageTitle='Thông tin' title={`Thông tin ‧ ${siteTitle}`} description={siteSubtitle} pageIs='More'>
        <ScrollAnimation>
          <CustomFooter viewportIs={viewportIs} />
        </ScrollAnimation>
      </Page>
    )
  }
}

export default props => (
  <InterfaceContext.Consumer>
    {({
      setToMorePage,
      viewportIs
    }) => (
        <MoreTemplate
          {...props}
          setPage={setToMorePage}
          viewportIs={viewportIs}
        />
      )}
  </InterfaceContext.Consumer>
)

export const query = graphql`
  query MorePage {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
