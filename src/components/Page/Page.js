import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { mediaQuery, FontStyle } from '../../utils/styles';

type Props = {
  title?: string,
  children: React.Node,
  isIndex: bool,
  isBlog: bool,
  isPage: bool,
  isIllussion: bool,
  withSidebar: bool,
  className: string
};

const PageStyle = css`
  ${mediaQuery.desktop} {
    margin-bottom: 32px;
  }
`;

const isIndexStyle = css``;
const isBlogStyle = css``;
const isPageStyle = css``;
const withSidebarStyle = css``;

const PageInner = styled(`div`)`
  padding: 25px 20px;

  ${mediaQuery.tablet} {
    padding: 30px 20px;
  }

  ${mediaQuery.desktop} {
    padding: 40px 35px;
  }
`;

const PageTitle = styled(FontStyle.h1)`
  margin-top: 0;
  margin-bottom: 24px;
`;

const PageBody = styled(`div`)`
  font-size: 1rem;
  line-height: 1rem;
  margin: 0 0 16px;
`;

const Page = ({ title, children, isIndex, isBlog, isPage, withSidebar, className }: Props) => {
  return (
    <div className={`
        ${PageStyle}
        ${isIndex && isIndexStyle}
        ${isBlog && isBlogStyle}
        ${isPage && isPageStyle}
        ${withSidebar && withSidebarStyle}
        ${className}
      `}
    >
      <PageInner>
        {title && <PageTitle>{title}</PageTitle>}
        <PageBody>
          {children}
        </PageBody>
      </PageInner>
    </div>
  );
};

export default Page;