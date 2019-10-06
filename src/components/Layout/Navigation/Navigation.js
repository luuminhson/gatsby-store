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
import { FontStyle, fontFamily, dimensions, mediaQuery, spacing, colors, breakpoints, headerHeight } from '../../../utils/styles';

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

const BackButton = styled(Link)`
    font-family: ${fontFamily.heading};
    width: 60px;
    height: ${dimensions.navHeightMobile};
    line-height: ${dimensions.navHeightMobile};
    font-size: 1.75rem;
    font-weight: 400;
    color: ${colors.mainDark};
    padding-left: 12px;
    margin-left: -0.75rem;
    box-sizing: border-box;

    span {
        display: none;
    }

    ${mediaQuery.tabletFrom} {
        width: auto;
        display: flex;
        align-items: center;

        span {
            font-size: 1rem;
            display: inline-block;
            margin-left: ${spacing.sm}px;
        }
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
    align-items: center;
    padding: 0 ${spacing.lg}px;
    z-index: 2000;
`;

const backBtnIn = keyframes`
    0% {
        opacity: 0;
    }
    70% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const backBtnOut = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
        color: ${colors.white};
    }
    100% {
        opacity: 0;
        color: ${colors.white};
    }
`;

const MobileNavBackButton = styled(`div`)`
    position: absolute;
    left: ${spacing.md + 4}px;
    top: 50%;
    transform: translateY(-50%);
    display: inline-flex;
    background: rgba(255,255,255,0.08);
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    animation: ${backBtnIn} 1.5s ease forwards;

    ${BackButton} {
        width: 48px;
        height: 48px;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const postBackBtn = css`
    ${BackButton} {
        i {
            color: ${colors.white};
        }
    }
`;

const mainTitleIn = keyframes`
    0% {
        opacity: 0;
    }
    30% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const mainTitleOut = keyframes`
    0% {
        opacity: 1;
    }
    30% {
        opacity: 0;
    }
    100% {
        opacity: 0;
        z-index: -1;
    }
`;

const MobileNavTitle = styled(FontStyle.h1)`
    font-size: 1.75em;
    width: 100%;
    text-align: center;
`;

const MobileNavLogo = styled(Logo)`
    svg {
        width: 104px;
        height: 24px;
    }
`;

const MainTitleModule = styled(`div`)`
    position: relative;
    display: flex;
    align-items: center;

    ${MobileNavTitle} {
        padding-left: ${spacing.md}px;
        margin-left: ${spacing.md}px;
        position: relative;

        &:after {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            display: block;
            width: 1px;
            height: 24px;
            background-color: ${colors.neutral3};
            opacity: 0.3;
        }
    }
`;

const MobileNavHome = css`
    ${MobileNavLogo} {
        svg {
            fill: ${colors.white};
            width: 122px;
            height: 28px; 
        }
    }
`;

const backButton = (to) => (
    <BackButton to={to}>
        <OiIcon icon='oi-icon-arrow-back' />
        <span>Back</span>
    </BackButton>
);

/* --------------------------- DESKTOP NAVIGATION --------------------------- */

class PureDesktopNavigation extends React.Component {

    render() {
        const {
            data,
            viewportIs,
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
    mainTitle,
    pageIs,
    className
}) => {

    const backLink = () => {
        if (null !== from) {
            return from;
        }

        return '/';
    }

    const mainTitleModule = (mainTitle) => (
        <MainTitleModule>
            <Link to='/' css={{ lineHeight: 0 }}><MobileNavLogo /></Link>
            <MobileNavTitle>{mainTitle}</MobileNavTitle>
        </MainTitleModule>
    )

    return (
        <MobileNavWrapper className={className} css={pageIs === 'Index' && MobileNavHome}>
            {(pageIs === 'Post' || pageIs === 'Product') &&
                <MobileNavBackButton css={pageIs === 'Post' && postBackBtn}>
                    {backButton(backLink())}
                </MobileNavBackButton>
            }
            {(pageIs === 'Post' || pageIs === 'Product') ? null :
               ( mainTitle ? mainTitleModule(mainTitle): <MobileNavLogo /> )
            }
        </MobileNavWrapper>
    );
}