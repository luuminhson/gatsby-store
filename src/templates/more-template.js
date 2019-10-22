// @flow
import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from '../components/LinkWithPrev';
import Page from '../components/Page';
import Footer from '../components/Layout/Footer';
import FooterModule,
{
  ModuleTitle,
  ModuleContent,
  FooterModuleWrapper,
  FooterModuleInner
} from '../components/Layout/Footer/FooterModule';
import type { MarkdownRemark } from '../types';

import InterfaceContext from '../context/InterfaceContext';
import { colors, mediaQuery, fontWeight, spacing } from '../utils/styles';

import bowingImg1 from '../imgs/thanks.gif';
import bowingImg2 from '../imgs/bow.gif';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const CustomFooter = styled(Footer)`
    background-color: ${colors.white};
    padding: ${spacing.sm}px 0 0;

    ${FooterModuleWrapper} {
            :nth-of-type(1) {
                border-top: 1px solid ${colors.neutral2};

                ${mediaQuery.tabletFrom} {
                    border-top: none;
                }
            }
    }
`;

const copyrightText = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.neutral4};
`;

const wishingANiceDay = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const wishImgs = css`
  margin-top: ${spacing.md}px;

  img {
    padding: 12px;
    margin: 0 -4px;
    box-sizing: content-box;
  }
`;

const wishText = css`
  color: ${colors.mainHighlight};
  font-weight: ${fontWeight.body.medium};
`;

const ModuleOthers = css`
    padding: 0 ${spacing.xl}px;
    width: 100%;

  ${FooterModuleInner} {
    border-bottom: none;
  }

  ${ModuleTitle} {
    display: none;
  }

  ${ModuleContent} {
    padding-top: ${spacing.md}px;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            margin: 0;
            padding: 0;
        }
    }

    ul > li,
    ul > li > a {
      justify-content: center;
      text-align: center;
      padding: ${spacing.sm}px 0;
      color: ${colors.mainDark};
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
      <Page mainTitle='Thông tin' title={`Thông tin ‧ ${siteTitle}`} description={siteSubtitle} pageIs='More'>
        <ScrollAnimation animateOnce animateIn='fadeIn'>
          <CustomFooter viewportIs={viewportIs} />
          <FooterModule viewportIs={viewportIs} alwaysExpand css={ModuleOthers} title='Others'>
            <ul>
              <li>
                <Link to='/privacy-policy'>Chính sách bảo mật</Link>
              </li>
              <li>
                <Link to='/terms-and-conditions'>Điều khoản &amp; Điều kiện</Link>
              </li>
              <li>
                <span css={copyrightText}>ORINS © 2019 - All right reserved</span>
              </li>
              <li css={wishingANiceDay}>
                <span css={wishText}>Chúc bạn một ngày vui!</span>
                <span css={wishImgs}>
                  <img src={bowingImg1} width='24' alt='Thank You from Oi' />
                  <img src={bowingImg2} width='24' alt='Thank You from Miso' />
                </span>
              </li>
            </ul>
          </FooterModule>
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
