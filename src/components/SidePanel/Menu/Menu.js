// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from '../../LinkWithPrev';
import { mediaQuery, colors, fontWeight, fontFamily } from '../../../utils/styles';

type Props = {
  menu: {
    label: string,
    path: string,
  }[],
  burgerClick: bool,
  isPost: bool,
  unfixed: bool,
  dark: bool,
  onFeaturedImage: bool
};

const MenuWrapperInner = styled(`nav`)`
  display: flex;
  position: relative;
  padding: 0;

  ${mediaQuery.tabletFrom} {
    display: flex;
  }
`;

const MenuWrapper =  styled(`div`)`
  display: flex;
  align-items: center;

  ${mediaQuery.tabletFrom} {
    ${MenuWrapperInner} {
      display: block;
    }
  }
`;

const UnfixedStyle = css`

`;

const onFeaturedImageStyle = css``;

const MenuList = styled(`ul`)`
  width: 100%;
  list-style: none;
  display: block;
  padding: 0;
  margin: 0;
`;

const MenuListItem = styled(`li`)`
  padding: 0;
  margin: 0;
`;

const MenuItemLink = styled(Link)`
  font-family: ${fontFamily.heading};
  font-weight: ${fontWeight.heading.medium};
  font-size: 0.9rem;
  padding: 0 40px;
  height: 48px;
  line-height: 48px;
  display: block;
  color: ${colors.mainDark};

  &:hover,
  &:focus {
    color: ${colors.mainDark};
  }
`;

const MenuLinkActiveStyle = css`
  &.activeMenuItem {
    position: relative;
    color: ${colors.mainClickable};

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      display: block;
      height: 24px;
      width: 3px;
      transform: translateY(-50%);
      background: ${colors.mainClickable};
    }
  }
`;

const Menu = ({ menu, isPost, unfixed, onFeaturedImage, toggleSidebar, ...rest }: Props) => (
  <MenuWrapper css={[
    unfixed && UnfixedStyle,
    onFeaturedImage && onFeaturedImageStyle,
  ]} {...rest}>
    {!isPost && (
      <MenuWrapperInner>
        <MenuList>
          {menu.map((item) => (
            <MenuListItem key={item.path}>
              <MenuItemLink
                to={item.path}
                onClick={toggleSidebar}
                css={MenuLinkActiveStyle}
                activeClassName='activeMenuItem'
                partiallyActive={item.path === '/' ? false : true}
              >
                {item.label}
              </MenuItemLink>
            </MenuListItem>
          ))}
        </MenuList>
      </MenuWrapperInner>
    )}
  </MenuWrapper>
);

export default Menu;
