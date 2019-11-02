import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from '../../LinkWithPrev';
import FooterModule, { ModuleTitle, ModuleContent, FooterModuleInner } from './FooterModule';
import Contact from '../../SidePanel/Contacts';

import { useSiteMetadata } from '../../../hooks';
import { mediaQuery, spacing, colors, fontWeight, FontStyle } from '../../../utils/styles';

import bowingImg1 from '../../../imgs/thanks.gif';
import bowingImg2 from '../../../imgs/bow.gif';

const menuItemHeight = '48px';

const FooterWrapper = styled(`div`)`
  position: relative;
  padding: 40px 0;
  background-color: ${colors.mainLight};

  ${mediaQuery.desktop} {
    padding: 100px 0 60px;
    background-color: transparent;
  }
`;

const FooterWrapperInner = styled(`div`)`
  display: flex;
  flex-direction: column;
  padding: 0 ${spacing.xl}px;

  ${mediaQuery.desktop} {
    flex-direction: row;
    padding: 0 ${spacing['3xl']}px;
    margin: 0 -${spacing.lg}px;
  }

  ${mediaQuery.desktop} {
    padding: 0 ${spacing['4xl']}px;
  }
`;

const Module = styled(FooterModule)`
  width: 100%;
  padding: 0;

  ${mediaQuery.desktop} {
    padding: 0 ${spacing.lg}px;
    margin-bottom: ${spacing.lg}px;
  }

  ${ModuleTitle} {
    font-size: 16px;
    margin-bottom: 0;

    ${mediaQuery.desktop} {
      margin-bottom: ${spacing.md}px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    > li {
      margin: 0;
      padding: 0;
      height: ${menuItemHeight};
      display: flex;
      align-items: center;

      > a {
        width: 100%;
        display: flex;
        color: ${colors.mainDark};
        padding: 12px 0;
      }
    }
  }

  ${mediaQuery.desktop} {
    width: 25%;
  }
`;

const AboutDesc = styled(`div`)`
  display: inline-block;
  padding-right: ${spacing.md}px;

  ${mediaQuery.desktop} {
    max-width: 320px;
    padding-right: ${spacing.lg}px;
  }
`;

const AboutText = styled(FontStyle.body)`
  display: block;
  color: ${colors.neutral3};
  margin-top: ${spacing.xs}px;
  margin-bottom: ${spacing.md}px;
`;

const copyrightText = css`
  display: flex;
  align-items: center;
  color: ${colors.neutral4};
`;

const wishingANiceDay = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto !important;

  ${mediaQuery.desktop} {
    flex-direction: row;
    height: ${menuItemHeight} !important;
  }
`;

const wishImgs = css`
  margin-top: ${spacing.md}px;

  img {
    padding: 12px;
    margin: 0 -4px;
    background-color: ${colors.white};
    border-radius: 100px;
    box-sizing: content-box;

    ${mediaQuery.desktop} {
      padding: 0;
      margin: 0 2px;
      background-color: transparent;
      border-radius: 0;
      box-sizing: border-box;
    }
  }

  ${mediaQuery.desktop} {
    margin-top: 0;
    margin-left: ${spacing.sm}px;
  }
`;

const wishText = css`
  color: ${colors.mainHighlight};
  font-weight: ${fontWeight.body.medium};
`;

const Copyright = css`
  margin-top: ${spacing.md}px !important;

  ${mediaQuery.desktop} {
    margin-top: 0 !important;
  }
`;

const ModuleOthers = css`
  ${FooterModuleInner} {
    border-bottom: none;
  }

  ${ModuleTitle} {
    display: none;
  }

  ${ModuleContent} {
    padding-top: 40px;

    ul > li,
    ul > li > a {
      justify-content: center;

      ${mediaQuery.desktop} {
        justify-content: flex-start;
      }
    }

    ${mediaQuery.desktop} {
      padding-top: 0;
    }
  }

  ${mediaQuery.desktop} {
    ${ModuleTitle} {
      display: flex;
    }
  }
`;

const FooterWidgetLink = styled(Link)`
  &.activeFootNavItem {
    color: ${colors.mainClickable};
  }
`;

const Footer = ({ viewportIs, ...rest }) => {
  const { contacts } = useSiteMetadata();

  return (
    <FooterWrapper {...rest}>
      <FooterWrapperInner>
        <Module viewportIs={viewportIs} title='ORINS là gì?'>
          <AboutDesc>
            <AboutText>ORINS là từ ghép của “Original Inside” - Điều bên trong nguyên bản.  Chúng tôi thiết kế, sản xuất túi xách và phụ kiện nhằm phục vụ cho sự tiện lợi trong cuộc sống hàng ngày với tinh thần luôn luôn khiêm nhường và hướng tới những giá trị nguyên bản.</AboutText>
            <Link to='/about'>Xem thêm</Link>
          </AboutDesc>
        </Module>

        <Module viewportIs={viewportIs} title='Liên hệ'>
          <Contact contacts={contacts} />
        </Module>

        <Module viewportIs={viewportIs} title='Trợ giúp'>
          <ul>
            <li>
              <FooterWidgetLink activeClassName='activeFootNavItem' to='/faqs'>Câu hỏi thường gặp</FooterWidgetLink>
            </li>
            <li>
              <FooterWidgetLink activeClassName='activeFootNavItem' to='/how-to-order'>Hướng dẫn đặt hàng</FooterWidgetLink>
            </li>
            <li>
              <FooterWidgetLink activeClassName='activeFootNavItem' to='/shipping-and-return'>Giao hàng &amp; Đổi trả</FooterWidgetLink>
            </li>
            <li>
              <FooterWidgetLink activeClassName='activeFootNavItem' to='/payment-methods'>Phương thức thanh toán</FooterWidgetLink>
            </li>
          </ul>
        </Module>

        <Module viewportIs={viewportIs} alwaysExpand css={ModuleOthers} title='Thông tin khác'>
          <ul>
            <li>
              <FooterWidgetLink activeClassName='activeFootNavItem' to='/privacy-policy'>Chính sách bảo mật</FooterWidgetLink>
            </li>
            <li>
              <FooterWidgetLink activeClassName='activeFootNavItem' to='/terms-and-conditions'>Điều khoản &amp; Điều kiện</FooterWidgetLink>
            </li>
            <li css={Copyright}>
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
        </Module>

      </FooterWrapperInner>
    </FooterWrapper>
  )
};

export default Footer;
