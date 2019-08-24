// @flow
import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery, layoutWidth } from '../../../utils/styles';

const ContentWrapper = styled(`div`)`
  max-width: $layout-post-single-width;
  padding: 0 24px;
  margin: 0 auto;
`;

const ContentBody = styled(`div`)`
  & figure {
    margin-bottom: 16px;

    & blockquote {
      font-style: italic;
      text-align: center;
      margin-top: 0;
      padding: 16px 0;

      & p {
        max-width: ${layoutWidth.post};
        font-size: ${16 * 1.6817}px;
        margin-top: 0;
        margin-bottom: 16px;
        line-height: 1.5;
      }

    }

  }

  & a {
    text-decoration: underline;
  }

  & * {
    max-width: ${layoutWidth.post};
    margin-left: auto;
    margin-right: auto;
  }

  & img {
    max-width: 100%;
  }

  ${mediaQuery.tabletFrom} {
    font-size: ${16 * 1.125}px;
    line-height: 1.125;
    margin-bottom: 16px;

    & p {
      font-size: ${16 * 1.125}px;
      line-height: 1.125;
      margin-bottom: 16px;
    }
  }
`;

type Props = {
  body: string
};

const Content = ({ body }: Props) => (
  <ContentWrapper>
    <ContentBody dangerouslySetInnerHTML={{ __html: body }} />
  </ContentWrapper>
);

export default Content;
