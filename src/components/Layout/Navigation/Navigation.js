// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import Headroom from 'react-headroom';
import Logo, { LogoDesktop } from './Logo';
import Menu from './Menu';
import OiIcon from '../../OiIcon';
import CartToggle from '../../Cart/CartToggle';
import { FontStyle, fontFamily, dimensions, mediaQuery, spacing, colors, breakpoints, shadow, headerHeight } from '../../../utils/styles';

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
    width: 100%;
    padding: 0 ${spacing.lg}px;
    position: relative;
    animation: ${startFade} 1s ease forwards;
    transition: all 0.3s ease-in-out;
    z-index: 2000;

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

const BurgerIcon = styled(`div`)`
  position: relative;
  width: 60px;
  height: ${dimensions.navHeightMobile};
  margin-right: -8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mediaQuery.tabletFrom} {
    margin-right: -12px;
  }
`;

const MainMenu = styled(Menu)`
    ${mediaQuery.tabletFrom} {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const HeadroomWrapper = styled(Headroom)`
    width: 100%;
    position: relative;
    z-index: 100;
`;

const unpinnedStyle = css``;

const pinnedStyle = css`
    ${NavigationWrapper} {
        background-color: ${colors.white};
        box-shadow: ${shadow.navShadow};

        ${BackButton} {
            color: ${colors.mainDark};

            i {
                color: ${colors.mainDark};
            }
        }

        ${CartToggleIcon},
        ${BurgerIcon} {
            i {
                color: ${colors.mainDark};
                transition: color 0.4s ease-in-out;
            }
        }
    }
`;

const unfixedStyle = css`
    ${NavigationWrapper} {
        box-shadow: none;
    }
`;

const isIndexStyle = css``;

const isPostStyle = css`
    ${BackButton} {
        color: ${colors.white};

        i {
            color: ${colors.white};
        }
    }

    ${CartToggleIcon},
    ${BurgerIcon} {
        i {
            color: ${colors.white};
        }
    }
`;

const isStoreStyle = css``;

const isProductStyle = css`
    background-color: transparent;
`;

const onFeaturedImageStyle = css``;

// MOBILE NAV STYLES

const MobileNavWrapper = styled(`div`)`
    position: relative;
    width: 100%;
    height: ${headerHeight.tablet};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${spacing.md + 4}px;
    // box-shadow: ${shadow.navShadow};
    z-index: 2000;
`;

const MobileNavBackButton = styled(`div`)`
    position: absolute;
    left: ${spacing.md + 4}px;
    top: 50%;
    transform: translateY(-50%);
    display: inline-flex;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 100px;

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

const MobileNavTitle = styled(FontStyle.h1)`
    font-size: 2em;
    width: 100%;
    text-align: center;
`;

const isIndexMobileStyle = css``;

const isPostMobileStyle = css`
    position: absolute;
    left: 0;
    top: 0;
    
    ${MobileNavBackButton} {
        left: ${spacing.lg}px;

        ${BackButton} {
            border-radius: 100px;
            background-color: rgba(0,0,0,0.12);
    
            i {
                color: ${colors.white};
            }
        }
    }
`;

const isStoreMobileStyle = css``;

const isProductMobileStyle = css`
    // height: 64px;

    ${MobileNavTitle} {
        font-size: 1.4rem;
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
    constructor(props) {
        super(props);

        this.state = {
            unfixed: true,
            pinned: false,
            unpinned: false
        };
    }

    headRoomUnfix = () => {
        this.setState({
            pinned: false,
            unpinned: false,
            unfixed: true
        });
    }

    headRoomUnpin = () => {
        this.setState({
            unfixed: false,
            pinned: false,
            unpinned: true
        });
    }

    headRoomPin = () => {
        this.setState({
            unfixed: false,
            unpinned: false,
            pinned: true
        });
    }

    render() {
        const {
            data,
            viewportIs,
            pageIs,
            toggleCart,
            burgerClick,
            onFeaturedImage,
            from,
            className
        } = this.props;

        const { unfixed, pinned, unpinned } = this.state;

        const {
            menu
        } = data.site.siteMetadata;

        const backLink = () => {
            if ('' !== from) {
                return from;
            }

            return '/';
        }

        const siteLogo = <Logo viewportIs={viewportIs} />;

        const navLeft = (
            <NavLeftWrapper>
                {(pageIs === 'Post' || pageIs === 'Product') ? backButton(backLink()) : <Link to='/'>{siteLogo}</Link>}
            </NavLeftWrapper>
        );

        const navCenter = (
            <NavCenterWrapper>
                <MainMenu menu={menu} pageIs={pageIs} onFeaturedImage={onFeaturedImage} unfixed={unfixed} />
            </NavCenterWrapper>
        );

        const navRight = (
            <NavRightWrapper>
                <CartToggleIcon toggle={toggleCart} />
                <BurgerIcon onClick={burgerClick}>
                    <OiIcon icon='oi-icon-menu' />
                </BurgerIcon>
            </NavRightWrapper>
        );

        return (
            <HeadroomWrapper
                upTolerance={8}
                downTolerance={8}
                onUnfix={this.headRoomUnfix}
                onUnpin={this.headRoomUnpin}
                onPin={this.headRoomPin}
                pinStart={viewportIs === 'desktop' ? 40 : (viewportIs === 'tablet') ? 20 : 0}
                css={[
                    onFeaturedImage && onFeaturedImageStyle,
                    unpinned && unpinnedStyle,
                    pinned && pinnedStyle,
                    unfixed && unfixedStyle,
                ]}
            >
                <NavigationWrapper className={className}
                    css={[
                        pageIs === 'Post' && isPostStyle,
                        pageIs === 'Index' && isIndexStyle,
                        pageIs === 'Store' && isStoreStyle,
                        pageIs === 'Product' && isProductStyle,
                    ]}
                >
                    <NavigationInner>
                        {navLeft}
                        {navCenter}
                        {navRight}
                    </NavigationInner>
                </NavigationWrapper>
            </HeadroomWrapper>
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
        if ('' !== from) {
            return from;
        }

        return '/';
    }

    return (
        <MobileNavWrapper className={className}
            css={[
                pageIs === 'Index' && isIndexMobileStyle,
                pageIs === 'Post' && isPostMobileStyle,
                pageIs === 'Store' && isStoreMobileStyle,
                pageIs === 'Product' && isProductMobileStyle,
            ]}
        >
            {(pageIs === 'Post' || pageIs === 'Product') && <MobileNavBackButton>{backButton(backLink())}</MobileNavBackButton>}
            {mainTitle ? <MobileNavTitle>{mainTitle}</MobileNavTitle> : <LogoDesktop />}
        </MobileNavWrapper>
    );
}