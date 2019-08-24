// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from '../../../LinkWithPrev';
import { mediaQuery, colors, dimensions } from '../../../../utils/styles';

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

const MenuWrapper =  styled(`div`)`
  display: flex;
  align-items: center;

  ${mediaQuery.tabletFrom} {
    ${BurgerIcon} {
      margin-right: 0;
    }
    ${MenuWrapperInner} {
      display: block;
    }
  }
`;

const BurgerIcon = styled(`div`)`
  position: relative;
  width: 60px;
  height: ${dimensions.headerHeightMobile};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -12px;

  span {
    width: 100%;
    height: 2px;
    background: ${colors.mainDark};
    transition: all ease-in-out 0.2s;

    &:last-child {
      width: 65%;
    }
  }

  ${mediaQuery.tabletFrom} {
    display: none;
  }
`;

const BurgerIconInner = styled(`div`)`
  width: 24px;
  height: 18px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-around;
  align-items: center;
`;

const UnfixedStyle = css`

`;

const onFeaturedImageStyle = css`
  ${BurgerIcon} {
    span {
      background: $color-light;
    }
  }
`;

const MenuWrapperInner = styled(`nav`)`
  display: none;
  position: relative;
  padding: 0;
  margin-right: 16px;

  ${mediaQuery.tabletFrom} {
    display: flex;
  }
`;

const MenuList = styled(`ul`)`
  list-style: none;
  display: block;
  padding: 0;
  margin: 0;
`;

const MenuListItem = styled(`li`)`
  display: inline-block;
  width: auto;
  padding: 0;
  margin: 0;
`;

const MenuItemLink = styled(Link)`
  font-family: $typographic-font-family-heading;
  font-size: 0.9rem;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  display: block;
  color: lighten(${colors.mainDark}, 20%);

  &:hover,
  &:focus {
    color: ${colors.mainDark};
  }
`;

const MenuLinkActiveStyle = css`
  &.activeMenuItem {
    position: relative;
    color: ${colors.mainDark};

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      display: block;
      width: calc(100% - 40px);
      height: 4px;
      background: $color-primary;
    }
  }
`;

const Menu = ({ menu, burgerClick, isPost, unfixed, onFeaturedImage }: Props) => (
  <MenuWrapper css={[
    unfixed && UnfixedStyle,
    onFeaturedImage && onFeaturedImageStyle,
  ]}>
    {!isPost && (
      <MenuWrapperInner>
        <MenuList>
          {menu.map((item) => (
            <MenuListItem key={item.path}>
              <MenuItemLink
                to={item.path}
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
    <BurgerIcon onClick={burgerClick}>
      <BurgerIconInner>
        <span></span>
        <span></span>
        <span></span>
      </BurgerIconInner>
    </BurgerIcon>
  </MenuWrapper>
);

export default Menu;
