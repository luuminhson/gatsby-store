import React, { Component } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { Link } from '../LinkWithPrev';
import OiIcon from '../OiIcon';

import { colors, shadow, spacing, mediaQuery } from '../../utils/styles';

const navHeight = '60px';

const BotNavWrapper = styled(`div`)`
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 3000;
`;

const BotNavInner = styled(`div`)`
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
            isIndex,
            isBlog,
            isPost,
            isStore,
            isCart,
            isMore,
            isProduct } = this.props;

        const { botNav } = data.site.siteMetadata;

        return (
            <BotNavWrapper className={className}
                css={[
                    isPost && isPostStyle,
                    isBlog && isBlogStyle,
                    isIndex && isIndexStyle,
                    isStore && isStoreStyle,
                    isProduct && isProductStyle,
                    isCart && isCartStyle,
                    isMore && isMoreStyle
                ]}
            >
                { ( isProduct || isPost ) ? null :
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
};

export default BottomNavigation;