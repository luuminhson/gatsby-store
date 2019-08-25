import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { mediaQuery, FontStyle, dimensions } from '../../utils/styles';

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

const PageInner = styled(`div`)`
  padding: 25px 20px;
  margin: 0 auto;
  max-width: 100%;

  ${mediaQuery.tablet} {
    padding: 30px 20px;
  }

  ${mediaQuery.desktop} {
    padding: 40px 35px;
    max-width: ${dimensions.indexPageWidth};
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

const isIndexStyle = css`
  ${PageInner} {

  }
`;

const isStoreStyle = css`
  ${PageInner} {
    max-width: ${dimensions.storePageWidth};
    padding-left: 0;
    padding-right: 0;
  }
`;

const isBlogStyle = css``;

const isPageStyle = css``;

const withSidebarStyle = css``;

const Page = ({ title, children, isIndex, isStore, isBlog, isPage, withSidebar, className }: Props) => {
  return (
    <div css={[
        PageStyle,
        isIndex && isIndexStyle,
        isStore && isStoreStyle,
        isBlog && isBlogStyle,
        isPage && isPageStyle,
        withSidebar && withSidebarStyle,
        className
    ]}
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