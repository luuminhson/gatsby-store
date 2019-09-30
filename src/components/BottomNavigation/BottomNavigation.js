import React, { Component } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { Link } from '../LinkWithPrev';
import OiIcon from '../OiIcon';
import CartNumber from '../Cart/CartNumber';

import { colors, shadow, mediaQuery } from '../../utils/styles';

const navHeight = '52px';

const BotNavWrapper = styled(`div`)`
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 150;

    ${mediaQuery.tabletFrom} {
        display: none;
    }
`;

const BotNavInner = styled(`div`)`
    position: relative;
    flex: 1 0 100%;
    display: flex;
    align-items: stretch;
    width: 100vw;
    height: ${navHeight};
    background-color: ${colors.white};
    box-shadow: ${shadow.botNavShadow};
`;

const NavList = styled(`ul`)`
    flex: 1 0 100%;
    display: flex;
    align-items: stretch;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
`;

const NavItem = styled(`li`)`
    flex: 1 0 20%;
    display: flex;
    align-items: stretch;
    margin: 0;
    padding: 0;
    display: inline-block;
`;

const NavItemLink = styled(Link)`
    flex: 1 0 100%;
    display: flex;
    height: ${navHeight};
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const NavIcon = styled(OiIcon)`

`;

const NavLabel = styled(`span`)`
    display: none;
`;

const BotNavLinkActiveStyle = css`
  &.activeBotNavItem {
    position: relative;

    i {
        color: ${colors.mainClickable};
    }
  }
`;

const CartItemNumber = styled(CartNumber)`
  position: absolute;
  left: calc(50%);
  top: 10px;
  z-index: 2900;
`;

const isIndexStyle = css``;

const isPostStyle = css``;

const isStoreStyle = css``;

const isBlogStyle = css``;

const isProductStyle = css``;

const isCartStyle = css``;

const isMoreStyle = css``;

class PureBottomNavigation extends Component {
    render() {
        const {
            data,
            className,
            cartNumber,
            pageIs
        } = this.props;

        const { botNav } = data.site.siteMetadata;

        return (
            <BotNavWrapper className={className}
                css={[
                    pageIs === 'Post' && isPostStyle,
                    pageIs === 'Blog' && isBlogStyle,
                    pageIs === 'Index' && isIndexStyle,
                    pageIs === 'Store' && isStoreStyle,
                    pageIs === 'Product' && isProductStyle,
                    pageIs === 'Cart' && isCartStyle,
                    pageIs === 'More' && isMoreStyle
                ]}
            >
                { ( pageIs === 'Post' || pageIs === 'Product' ) ? null :
                    <BotNavInner>
                        <NavList>
                            {botNav.map((item) => (
                                <NavItem key={item.path}>
                                    <NavItemLink
                                        to={item.path}
                                        css={BotNavLinkActiveStyle}
                                        activeClassName='activeBotNavItem'
                                        partiallyActive={item.path === '/' ? false : true}
                                    >
                                        <NavIcon icon={item.icon} />
                                        <NavLabel>{item.label}</NavLabel>
                                    </NavItemLink>
                                </NavItem>
                            ))}
                        </NavList>
                        <Link to='/cart'><CartItemNumber number={cartNumber} /></Link>
                    </BotNavInner>
                }
            </BotNavWrapper>
        );
    }
}

export const BottomNavigation = (props) => (
    <StaticQuery
        query={graphql`
        query BottomNavigationQuery {
          site {
            siteMetadata {
              botNav {
                icon
                label
                path
              }
            }
          }
        }
      `}
        render={(data) => <PureBottomNavigation {...props} data={data} />}
    />
);

BottomNavigation.propTypes = {
    className: PropTypes.string,
    cartNumber: PropTypes.number
};

export default BottomNavigation;