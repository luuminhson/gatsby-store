import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { mediaQuery, FontStyle, dimensions, spacing } from '../../utils/styles';

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
  padding: 24px 0.75rem;
  margin: 0 auto;
  max-width: 100%;

  ${mediaQuery.tabletFrom} {
    padding: 30px 1rem;
    max-width: ${dimensions.indexPageWidth};
  }

  ${mediaQuery.desktop} {
    padding: 40px 60px;
  }
`;

const PageTitle = styled(FontStyle.h1)`
  margin: 40px auto;
  text-align: center;
`;

export const PageBody = styled(`div`)`
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

const isBlogStyle = css`
  ${PageInner} {
    margin: 0 auto;
    padding-left: ${spacing.lg}px;
    padding-right: ${spacing.lg}px;

    ${mediaQuery.tabletFrom} {
      max-width: ${dimensions.blogPageWidth};
      padding-left: ${spacing.xl}px;
      padding-right: ${spacing.xl}px;
    }
  }
`;

const isPageStyle = css``;

const withSidebarStyle = css`
  ${PageInner} {
    max-width: ${dimensions.blogWithSidebarPageWidth};
  }
`;

const Page = ({ title, children, isIndex, isStore, isBlog, isPage, withSidebar, css, ...rest }: Props) => {
  return (
    <div css={[
        PageStyle,
        isIndex && isIndexStyle,
        isStore && isStoreStyle,
        isBlog && isBlogStyle,
        isPage && isPageStyle,
        withSidebar && withSidebarStyle,
        css
    ]}
    {...rest}
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