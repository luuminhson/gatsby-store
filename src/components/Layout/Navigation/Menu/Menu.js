// @flow
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from '../../../LinkWithPrev';
import { mediaQuery, colors, fontWeight, fontFamily } from '../../../../utils/styles';

type Props = {
  menu: {
    label: string,
    path: string,
  }[],
  burgerClick: bool,
  isPost: bool,
  unfixed: bool,
  dark: bool,
};

const MenuWrapperInner = styled(`nav`)`
  display: none;
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
  font-family: ${fontFamily.heading};
  font-weight: ${fontWeight.heading.bold};
  font-size: 0.95rem;
  padding: 0 20px;
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
  }
`;

const Menu = ({ menu, ...rest }: Props) => (
  <MenuWrapper {...rest}>
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
  </MenuWrapper>
);

export default Menu;
