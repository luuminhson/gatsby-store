// @flow
import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery, layoutWidth, colors } from '../../../utils/styles';

import "../../../assets/prism-themes/themes/prism-atom-dark.css";

const ContentWrapper = styled(`div`)`
  max-width: ${layoutWidth.post};
  padding: 0 24px;
  margin: 0 auto;
`;

const ContentBody = styled(`div`)`
  max-width: ${layoutWidth.post};
  font-size: ${16 * 1.125}px;
  line-height: 1.5;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;

  & * {
    max-width: 46.5625rem;
    margin-left: auto;
    margin-right: auto;
  }

  hr {
    color: ${colors.mainDark};
    height: 26px;
    margin: 3.25rem auto;
    background-size: 100% 26px;
    background-image: linear-gradient(180deg,transparent 1px,transparent 11px,#222 0,#222 15px,transparent 0,transparent 26px);
    border: none;
    width: 6.25rem;
  }

  strong {
    font-weight: 600;
  }

  figure {
    margin-bottom: 16px;

    blockquote {
      font-style: italic;
      text-align: center;
      margin-top: 0;
      padding: 16px 0;

      p {
        max-width: ${layoutWidth.post};
        font-size: ${16 * 1.6817}px;
        margin-top: 0;
        margin-bottom: 1.625rem;
        line-height: 2.4375rem;
        font-weight: 400;
      }

    }

    figcaption {
      line-height: 1.21875rem;
      margin-top: .40625rem;
      color: #222;
      font-size: .875rem;
      font-style: italic;
      margin-bottom: 0;
      text-align: center;
    }

  }

  & a {
    text-decoration: underline;
  }

  & img {
    max-width: 100%;
  }

  .anchor {
    margin-left: -1.875rem;
    padding-right: 0.875rem;
  }

  ${mediaQuery.tabletFrom} {
    font-size: ${16 * 1.125}px;
    margin: 2.4375rem 0;

    p {
      font-size: ${16 * 1.125}px;
      margin-bottom: 1.82813rem;
      line-height: 1.82813rem;
    }

    .float-right {
      float: right;
    }

    .float-left {
      float: left;
    }

    figure {
      &.float-left,
      &.float-right {
        max-width: 20rem;
        padding: 0 1.625rem;
        margin: 1.625rem auto;
        box-sizing: content-box;
      }
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
