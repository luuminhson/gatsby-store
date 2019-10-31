// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import { Link } from 'gatsby';
import Logo from './Logo';
import Menu from './Menu';
import OiIcon from '../../OiIcon';
import CartToggle from '../../Cart/CartToggle';
import CartNumber from '../../Cart/CartNumber';
import { dimensions, mediaQuery, spacing, colors, breakpoints, headerHeight } from '../../../utils/styles';

/* --------------------------- STYLES --------------------------- */

const startFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
      opacity: 0;
      transform: translateY(20px);
  }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
`;

// DESKTOP NAV STYLES

const NavigationWrapper = styled(`div`)`
    position: relative;
    width: 100%;
    padding: 0 ${spacing.lg}px;
    animation: ${startFade} 1s ease forwards;
    transition: all 0.3s ease-in-out;
    z-index: 100;

    ${mediaQuery.tabletFrom} {
        padding: 0 ${spacing.xl}px;
    }

    ${mediaQuery.desktop} {
        padding: 0 ${spacing['4xl']}px;
    }
`;

const NavigationInner = styled(`div`)`
    position: relative;
    height: ${dimensions.navHeightMobile};
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    margin: 0 auto;
    // max-width: ${breakpoints.fhd}px;
    transition: height 0.2s ease-in-out;

    ${mediaQuery.tabletFrom} {
        height: ${dimensions.navHeightTablet};
    }

    ${mediaQuery.desktop} {
        height: ${dimensions.navHeightDesktop};
    }
`;

const NavLeftWrapper = styled(`div`)`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
`;

const NavCenterWrapper = styled(`div`)`
    max-width: 56%;
    display: flex;
    align-items: center;
    position: relative;

    ${mediaQuery.tabletFrom} {
        max-width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const NavRightWrapper = styled(`div`)`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
`;

const CartToggleIcon = styled(CartToggle)`
    display: flex;
`;

const MainMenu = styled(Menu)`
    ${mediaQuery.tabletFrom} {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

// MOBILE NAV STYLES

const MobileNavWrapper = styled(`div`)`
    position: relative;
    width: 100%;
    height: ${headerHeight.tablet};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${spacing.lg}px;
    z-index: 100;
`;

const MobileNavLogo = styled(Logo)`
    svg {
        width: 87px;
        height: 20px;
    }
`;

const MovileNavIconWrapper = styled(`div`)`
    position: relative;
    padding: ${spacing.sm}px;

    > * {
        display: block;
        width: 24px;
        height: 24px;
    }
`;

const CartItemNumber = styled(CartNumber)`
  position: absolute;
  top: 6px;
  right: 4px;
  z-index: 2900;
`;

const MobileNavWhite = css`
    ${MobileNavLogo} {
        svg {
            fill: ${colors.white};
        }
    }

    ${MovileNavIconWrapper} {
        i {
            color: ${colors.white};
        }
    }
`;

/* --------------------------- DESKTOP NAVIGATION --------------------------- */

class PureDesktopNavigation extends React.Component {

    render() {
        const {
            data,
            toggleCart,
            onFeaturedImage,
            className
        } = this.props;

        const {
            menu
        } = data.site.siteMetadata;

        const siteLogo = <Logo />;

        const navLeft = (
            <NavLeftWrapper>
                <Link to='/'>{siteLogo}</Link>
            </NavLeftWrapper>
        );

        const navCenter = (
            <NavCenterWrapper>
                <MainMenu menu={menu} onFeaturedImage={onFeaturedImage} />
            </NavCenterWrapper>
        );

        const navRight = (
            <NavRightWrapper>
                <CartToggleIcon toggle={toggleCart} />
            </NavRightWrapper>
        );

        return (
            <NavigationWrapper className={className}>
                <NavigationInner>
                    {navLeft}
                    {navCenter}
                    {navRight}
                </NavigationInner>
            </NavigationWrapper>
        );
    }
}

export const DesktopNavigation = (props) => (
    <StaticQuery
        query={graphql`
        query NavigationQuery {
          site {
            siteMetadata {
              title
              description
              copyright
              menu {
                label
                path
              }
            }
          }
        }
      `}
        render={(data) => <PureDesktopNavigation {...props} data={data} />}
    />
);

DesktopNavigation.propTypes = {
    viewportIs: PropTypes.string,
    toggleCart: PropTypes.func.isRequired,
    burgerClick: PropTypes.func.isRequired,
};

/* --------------------------- MOBILE NAVIGATION --------------------------- */

export const MobileNavigation = ({
    from,
    pageIs,
    cartNumber,
    toggleSidebar,
    className
}) => {

    const backLink = () => {
        if (null !== from) {
            return from;
        }
        return '/';
    }

    // Back Button for backup

    const backButton = (
        <MovileNavIconWrapper>
            <Link to={backLink()}>
                <OiIcon icon='oi-icon-arrow-back' />
            </Link>
        </MovileNavIconWrapper>
    );

    const navLeft = (
        <NavLeftWrapper>
            <Link to='/' css={{ lineHeight: 0 }}><MobileNavLogo /></Link>
        </NavLeftWrapper>
    )

    const navRight = (
        <NavRightWrapper>
            <MovileNavIconWrapper>
                <Link to='/cart'>
                    <OiIcon icon='oi-icon-cart' />
                    <CartItemNumber number={cartNumber} />
                </Link>
            </MovileNavIconWrapper>
            <MovileNavIconWrapper>
                <div onClick={toggleSidebar}>
                    <OiIcon icon='oi-icon-menu' />
                </div>
            </MovileNavIconWrapper>
        </NavRightWrapper>
    );

    return (
        <MobileNavWrapper className={className} css={(pageIs === 'Index' || pageIs === 'Post') && MobileNavWhite}>
            {navLeft}
            {navRight}
        </MobileNavWrapper>
    );
}